const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola Taller 3');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;