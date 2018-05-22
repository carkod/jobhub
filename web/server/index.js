import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import path from 'path';

import router from './routes-index.js';
import universalLoader from './universal';

// Create our express app (using the port optionally specified)
const app = express();
const PORT = process.env.PORT || 80;

// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up route handling, include static assets and an optional API
app.use('/', router);
app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/', universalLoader);

// Let's rock
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});