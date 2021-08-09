// api router will mount other routers
module.exports = (app) => {
  app.use('/api/currencyexchange', require('./currencyexchange/currencyexchange.routes'));
};
