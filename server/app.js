const dotenv = require('dotenv'); // utilizzo le variabili ambiente
const express = require('express');

const twilioRouter = require('./routes/twilioRoutes');

const app = express();

dotenv.config({ path: './config.env' }); // carico il file con le variabili d'ambiente in process.env

// MIDDLEWARES
app.use(express.json()); // permette di analizzare le richieste in arrivo con JSON payload

// ROUTES
app.use('/sendMessage', twilioRouter);

module.exports = app;
