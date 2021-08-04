const express = require('express');

const app = express();
const port = process.env.PORT || 9030;
const runningMessage = `Galvanize Currency Convert Service V1 Running on port ${port}`;

// setup the Express middlware
require('./middleware/middleware')(app);

// setup the api
require('./api/api.routes')(app);

const server = app.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
