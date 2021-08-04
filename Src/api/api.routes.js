// api router will mount other routers
module.exports = (app) => {
  app.get('/', (req, res) => { res.send('Welcome to Galvanize Currency Convert Service.'); });
  app.use('/api/currencyexchange', require('./currencyexchange/currencyexchange.routes'));
};
