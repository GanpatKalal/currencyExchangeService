const express = require('express');
const createError = require('http-errors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = require('./docs/api.info');

const app = express();

// setup the Express middlware
require('./middleware/middleware')(app);

// setup the api
require('./api/api.routes')(app);

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api/currencyexchange/*.routes*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// this will serve your swagger.json file using express
app.use(express.static(`${__dirname}`));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
