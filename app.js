const express = require('express');
const configcat = require('configcat-node');
const app = express();
const configCatClient = process.env.CONFIGCAT_SDK_KEY
  ? configcat.getClient(process.env.CONFIGCAT_SDK_KEY)
  : null;

app.get('/', (req, res) => {
  res.send('Hola Taller 3');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/funcionalidad', async (req, res) => {
  if (!configCatClient) {
    return res.status(503).send('CONFIGCAT_SDK_KEY no está configurada');
  }

  const enabled = await configCatClient.getValueAsync('nueva-funcionalidad-x', false);
  res.send(enabled ? 'Nueva funcionalidad' : 'Funcionalidad antigua');
});

module.exports = app;