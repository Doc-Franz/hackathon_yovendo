const dotenv = require('dotenv'); // utilizzo le variabili ambiente
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' }); // carico il file con le variabili d'ambiente in process.env
const { QdrantClient } = require('@qdrant/js-client-rest');

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

async function init() {
  console.log(process.env.QDRANT_URL);
  try {
    await qdrant.createCollection('organization_docs', {
      vectors: {
        size: 768,
        distance: 'Cosine',
        checkCompatibility: false,
      },
    });
    console.log('Collection created successfully!');
  } catch (error) {
    if (error.response?.data?.status === 'already_exists') {
      console.log('Collection already exists.');
    } else {
      console.error('Error creating collection:', error.message);
    }
  }
}

init();
