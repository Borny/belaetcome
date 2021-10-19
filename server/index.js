const express = require('express');
const path = require('path');

const app = express();
const env = {
  ENV: process.env.NODE_ENV || 'local',
  // BACKEND_URI: process.env.BACKEND_URI || 'http://localhost:8090',
  BACKEND_URI: process.env.BACKEND_URI || 'http://localhost:9090',
  PORT: process.env.CLIENT_PORT || 8099,
  VERSION: process.env.npm_package_version,
};

app.get('/env', (req, res) => {
  return res.json(env);
});

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(env.PORT, () => {
  console.log(`The server is listening on port ${env.PORT}`);
});
