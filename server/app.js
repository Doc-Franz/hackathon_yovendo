const dotenv = require('dotenv'); // utilizzo le variabili ambiente
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' }); // carico il file con le variabili d'ambiente in process.env

const db = require('./db'); // modulo che gestisce il database con PostgreSQL

const twilioRouter = require('./routes/twilioRoutes');
const vertexRouter = require('./routes/vertexRoutes');
const organizationsRouter = require('./routes/organizationsRoutes');

// MIDDLEWARES
app.use(express.json()); // permette di analizzare le richieste in arrivo con JSON payload

// ROUTES
app.use('/api/twilio', twilioRouter);
app.use('/api/vertex', vertexRouter);
app.use('/api/organizations', organizationsRouter);

module.exports = app;
