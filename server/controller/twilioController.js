const fs = require('fs');
const organizationsController = require('./organizationsController');
const qdrant = require('./../utils/qdrant');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

// Ricezione di un messaggio ogni volta che viene effettuata una GET a /sendMessage
exports.sendMessage = (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const whatsappBody = JSON.parse(
    fs.readFileSync(`${__dirname}/whatsapp.json`, 'utf-8', (err) => {
      if (err) {
        console.log(err.message);
      }
    }),
  );

  console.log(whatsappBody.message);

  client.messages
    .create({
      body: whatsappBody.message.candidates[0].content.parts[0].text,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+393460815974',
    })
    .then((message) => console.log(message.sid));

  res.send('Message has been sent');
};

// funzione di risposta al messaggio ricevuto dall'utente
exports.messageFromOrganization = async (req, res) => {
  // messaggio inviato dall'utente
  const { message } = req.body;

  // Identificazione dell'azienda
  const org_id = 97;

  // embedding del messaggio ricevuto
  const queryEmbedding =
    await organizationsController.getEmbeddedVectors(message);

  // query a Qdrant
  const searchResult = await qdrant.search('organization_docs', {
    vector: queryEmbedding,
    limit: 5,
    filter: {
      must: [
        {
          key: 'organization_id',
          match: { value: org_id },
        },
      ],
    },
  });

  // const resultsss = await qdrant.scroll('organization_docs', {
  //   limit: 1,
  // });

  // console.log(resultsss.points[0].payload);

  // console.log(searchResult);
  const contextChunks = searchResult.map((hit) => hit.payload.chunk).join('\n');

  // prompt Gemini
  const prompt = `Contesto:\n${contextChunks}\n\nDomanda:\n${message}`;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const reply = await result.response.text();

  console.log(reply);
};
