const fs = require('fs');

const { VertexAI } = require('@google-cloud/vertexai');

exports.sendMessage = (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'Hey, there!',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+393460815974',
    })
    .then((message) => console.log(message.sid));

  res.send('Message has been sent');
};

exports.generate_from_text_input = async () => {
  const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: 'us-central1',
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
  });

  const prompt =
    "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse));
};
