const db = require('./../db');
const upload = require('../utils/multer');
const qdrant = require('./../utils/qdrant');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const XLSX = require('xlsx');
const Tesseract = require('tesseract.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// funzione di embedidng (trascrizione in vettori numerici) dei testi
exports.getEmbeddedVectors = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

  const result = await model.embedContent(text);

  // console.log(result.embedding.values);
  return result.embedding.values;
};

// funzione per aggiungere una nuova compagnia con i relativi documenti
exports.newOrganization = [
  upload.array('documents', 20), // si può caricare fino ad un massimo di 20 documenti
  async (req, res) => {
    const { name, username, password } = req.body; // info della compagnia
    const files = req.files; // array di oggetti file generato da multer

    try {
      // salvo le info dell'organizzazione nel db
      const orgInfo = await db.one(
        'INSERT INTO organizations(name, username, password) VALUES($1, $2, $3) RETURNING *',
        [name, username, password],
      );

      const uploadedDocs = [];

      for (const file of files) {
        // carico il documento sul db
        const doc = await db.one(
          `INSERT INTO organization_documents(organization_id, filename, mimetype, file_url)
           VALUES($1, $2, $3, $4) RETURNING *`,
          [orgInfo.id, file.originalname, file.mimetype, file.path],
        );
        uploadedDocs.push(doc);

        // faccio embedding (trascrizione in vettori numerici) dei documenti
        const textContent = await extractTextFromCloudinary(
          file.path,
          file.mimetype,
        );

        const chunks = splitText(textContent);

        // embedding del testo dei documenti
        const embeddedArray = []; // array con l'embedding di tutto il testo del documento

        for (const chunk of chunks) {
          const embeddedChunk = await getEmbeddedVectors(chunk); // embedded del singolo chunl
          embeddedArray.push(embeddedChunk);

          // caricamento degli embedding nella collection su Qdrant
          await qdrant.upsert('organization_docs', {
            points: [
              {
                id: Date.now() + Math.floor(Math.random() * 10000), // ID univoco per ogni chunk
                vector: embeddedChunk,
                payload: {
                  organization_id: orgInfo.id,
                  document_id: doc.id,
                  chunk: chunk,
                },
              },
            ],
          });
        }
      }

      res.status(201).json({
        message: 'The organization has been added',
        content: orgInfo,
        documents: uploadedDocs,
      });
    } catch (error) {
      console.log('error: ', error.message);
      res.status(500).json({ error: error.message });
    }
  },
];

// funzione per eliminare i documenti di una compagnia
exports.deleteDocument = async (req, res) => {
  const { id } = req.params; // recupero l'id del documento da eliminare dall'URL
  console.log(id);

  try {
    const deleted = await db.result(
      `DELETE FROM organization_documents WHERE id = $1`,
      [id],
    );

    if (deleted.rowCount == 0) {
      res.status(400).json({ message: 'Documento non trovato' });
    } else {
      res.status(200).json({ message: 'Documento eliminato con successo' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// funzione per estrarre il testo dai documenti
const extractTextFromCloudinary = async (cloudinaryURL, mime) => {
  let textContent = ''; // inizializzazione della variabile che conterrà la trascrizione del testo del documento
  try {
    const response = await axios.get(cloudinaryURL, {
      responseType: 'arraybuffer',
    });

    // .pdf
    if (mime === 'application/pdf') {
      const data = await pdfParse(response.data);
      textContent = data.text;
    }

    // .docx
    else if (
      mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: response.data });
      textContent = result.value;
    }

    // .xlsx
    else if (
      mime ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const workbook = XLSX.read(response.data, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      textContent = XLSX.utils.sheet_to_csv(sheet);
    }

    // image
    else if (mime.startsWith('image/')) {
      const result = await Tesseract.recognize(response.data, 'eng');
      textContent = result.data.text;
    }

    // console.log('FILE: ', textContent);
    return textContent;
  } catch (error) {
    console.error(
      'Errore durante il download o parsing del PDF:',
      error.message,
    );
    return null;
  }
};

// funzione di split per creare l'embedding dei documenti (max 512 token per ogni model di embedding) ->
// tengo un overlap (sovrapposizione) di 50 che è il numero di parole che vengono ripetute tra un modello e un altro -> viene preservata la continuità semantica
const splitText = (text, maxToken = 512, overlap = 50) => {
  const cleanText = text.replace(/\s+/g, ' ').trim(); // sostituisce tutti gli spazi bianchi (inclusi \n, \t) con uno spazio singolo
  const words = cleanText.split(' '); //divido le parole del testo e le inserisco in un array
  const chunks = [];

  for (let i = 0; i < words.length; i += maxToken - overlap) {
    const chunk = words.slice(i, i + maxToken).join(' ');
    chunks.push(chunk); // ricreo un array di stringhe con n = maxToken parole
    if (i + maxToken >= words.length) break;
  }

  return chunks;
};

// GET per richiamare tutte le aziente
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await db.any('SELECT * FROM organizations');
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
