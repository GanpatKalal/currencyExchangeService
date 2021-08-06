/* eslint-disable consistent-return */
const axios = require('axios');
const fsPromises = require('fs').promises;

const datafile = '././data/currencyTypes.json';

// eslint-disable-next-line camelcase
const access_key = 'ee9e6ea42766deaefe5bb34abb202d08';
function currencyexchangeController() {
  async function getCurrencyType() {
    const rawData = await fsPromises.readFile(datafile, 'utf8');
    const currencyTypes = JSON.parse(rawData);
    return currencyTypes.CurrencyTypes;
  }

  async function getSupportedCurrentTypes(req, res) {
    try {
      const data = await getCurrencyType();
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  function getCurrencyConvertValue(req, res) {
    const model = req.body;
    if (!model) {
      res.status(400);
      return res.send('req.body is empty or null');
    }
    const { currencyValue, convertFrom, convertTo } = model;
    if (!currencyValue) {
      res.status(400);
      return res.send('currencyValue is empty or null');
    }
    if (!convertFrom) {
      res.status(400);
      return res.send('convertFrom is empty or null');
    }
    if (!convertTo) {
      res.status(400);
      return res.send('convertTo is empty or null');
    }
    const propertyName = convertFrom + convertTo;
    console.log(`propertyName  ${propertyName}`);
    console.log(
      `Request for current conver value ${currencyValue}, conevrtFrom: ${convertFrom}, conevrtto: ${convertTo}.`
    );
    axios({
      method: 'get',
      // eslint-disable-next-line camelcase
      url: `http://apilayer.net/api/live?access_key=${access_key}&currencies=${convertTo}&source=${convertFrom}&format=${currencyValue}`,
    })
      .then((err, response) => {
        if (response.status === 200) {
          const { quotes } = response.data;
          const [first] = Object.values(quotes);
          res.status(200);
          return res.send(JSON.stringify(first));
        }
        res.status(404);
        return res.send(`Unable to convert currency from: ${convertFrom}  to: ${convertTo}.`);
      })
      // eslint-disable-next-line arrow-body-style
      .catch((error) => {
        res.status(500);
        return res.send(error);
      });
  }
  return { getSupportedCurrentTypes, getCurrencyConvertValue };
}

module.exports = currencyexchangeController;
