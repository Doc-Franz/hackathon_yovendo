const fs = require('fs');
const { VertexAI } = require('@google-cloud/vertexai');

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
