const http = require('http');
const debug = require('debug')('webapp:server');

const app = require('../app');
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

const port = normalizePort(process.env.PORT || '3000');

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
app.set('port', port);

/**
  * Create HTTP server.
  */
const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
}

const runningMessage = `Galvanize Currency Convert Service V1 Running on port ${port}`;

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log(runningMessage);
});

server.on('error', onError);
server.on('listening', onListening);
