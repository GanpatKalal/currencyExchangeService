const axios = require('axios');
const fsPromises = require('fs').promises;

function currencyexchangeController(datafile = '././data/currencyTypes.json') {
  // eslint-disable-next-line camelcase
  const access_key = 'ee9e6ea42766deaefe5bb34abb202d08';
  async function getCurrencyType() {
    try {
      const rawData = await fsPromises.readFile(datafile, 'utf8');
      const currencyTypes = JSON.parse(rawData);
      return currencyTypes.CurrencyTypes;
    } catch (error) {
      throw new Error('Unable to read');
    }
  }

  async function getSupportedCurrentTypes(req, res) {
    try {
      const data = await getCurrencyType();
      res.status(200);
      return res.send(data);
    } catch (error) {
      res.status(500);
      return res.send(error);
    }
  }

  async function getCurrencyConvertValue(req, res) {
    console.log(req.body);
    const model = req.body;
    if (!model) {
      res.status(400);
      res.send('req.body is empty or null');
    }
    const { currencyValue, convertFrom, convertTo } = model;
    if (!currencyValue) {
      res.status(400);
      res.send('currencyValue is empty or null');
    }
    if (!convertFrom) {
      res.status(400);
      res.send('convertFrom is empty or null');
    }
    if (!convertTo) {
      res.status(400);
      res.send('convertTo is empty or null');
    }
    // eslint-disable-next-line camelcase
    const destinationUrl = `http://apilayer.net/api/live?access_key=${access_key}&currencies=${convertTo}&source=${convertFrom}&format=${currencyValue}`;
    console.log(destinationUrl);
    try {
      const response = await axios.get(destinationUrl);
      const { success } = response.data;
      const { quotes } = response.data;
      if (success) {
        const [first] = Object.values(quotes);
        res.status(200);
        return res.send(JSON.stringify(first));
      }
    } catch (error) {
      res.status(500);
      return res.send(error);
    }
  }

  return { getCurrencyType, getSupportedCurrentTypes, getCurrencyConvertValue };
}

module.exports = currencyexchangeController;
