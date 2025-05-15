const organizationsController = require('./organizationsController');
const db = require('./../db');
const qdrant = require('./../utils/qdrant');
const { VertexAI } = require('@google-cloud/vertexai');

let organization_id = null; // inizializzazione dell'id dell'azienda selezionata

// funzione di risposta al messaggio ricevuto dall'utente
const messageFromOrganization = async (userMessage, sender, res) => {
  // Identificazione dell'azienda
  // const org_id = 97;

  // embedding del messaggio ricevuto
  const queryEmbedding =
    await organizationsController.getEmbeddedVectors(userMessage);

  // query a Qdrant
  const searchResult = await qdrant.search('organization_docs', {
    vector: queryEmbedding,
    limit: 10,
    filter: {
      must: [
        {
          key: 'organization_id',
          match: { value: organization_id },
        },
      ],
    },
  });

  const contextChunks = searchResult.map((hit) => hit.payload.chunk).join('\n');

  // prompt Gemini
  const prompt = `Contesto:\n${contextChunks}\n\nDomanda:\n${userMessage}\n\nRispondi in massimo 150 parole.`;
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: 'us-central1',
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
  });

  const result = await generativeModel.generateContent(prompt);
  const reply = result.response.candidates[0].content.parts[0].text;

  // console.log(reply);
  sendNewMessage(reply);
  res.send('Risposta inviata con successo');
};

// funzione di risposta dell'azienda
const sendNewMessage = (reply) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  // console.log(process.env.WHATSAPP_NUMBER);

  client.messages
    .create({
      body: reply,
      from: 'whatsapp:+14155238886',
      to: process.env.WHATSAPP_NUMBER,
    })
    .then((message) => console.log(message.sid));
};

// quando clicco su 'contattaci' nel frontend viene registrato l'id dell'azienda
exports.getOrganization = async (req, res) => {
  const { id } = req.params; // recupero l'id dell'azienda dai parametri dell'URL
  try {
    const organization = await db.one(
      'SELECT * FROM organizations WHERE id = $1',
      [id],
    );
    organization_id = organization.id;
    console.log(`L'azienda con id ${organization_id} è stata trovata`);
    res.status(200).json({ organization });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

// funzione che riceve e salva il messaggio dall'utente
exports.messageFromUser = async (req, res) => {
  const userMessage = req.body.Body;
  const sender = req.body.From;

  // richiamo la funzione di risposta dell'azienda
  // console.log('Messaggio ricevuto: ', userMessage);
  await messageFromOrganization(userMessage, sender, res);
};
