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
