const fs = require('fs');

const { VertexAI } = require('@google-cloud/vertexai');

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

// Risposta ogni volta che si effettua una POST a /sendMessage
exports.generate_from_text_input = async () => {
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: 'us-central1',
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
  });

  const prompt = "What's your name?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = resp.response;
  console.log(
    JSON.stringify(contentResponse.candidates[0].content.parts[0].text),
  );

  const data = {
    message: contentResponse,
  };

  fs.writeFile(`${__dirname}/whatsapp.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err.message);
    }
  });
};
