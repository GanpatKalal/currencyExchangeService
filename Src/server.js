const express = require('express');

const app = express();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const tempPort = parseInt(val, 10);

  if (Number.isNaN(tempPort)) {
    // named pipe
    return val;
  }

  if (tempPort >= 0) {
    // port number
    return tempPort;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '9030');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = app.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

const runningMessage = `Galvanize Currency Convert Service V1 Running on port ${port}`;

// setup the Express middlware
require('./middleware/middleware')(app);

// setup the api
require('./api/api.routes')(app);

const server = app.listen(port, () => {
  console.log(runningMessage);
});

app.on('error', onError);
app.on('listening', onListening);

module.exports = server;
