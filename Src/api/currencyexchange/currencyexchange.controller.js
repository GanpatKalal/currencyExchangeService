const axios = require('axios');

// eslint-disable-next-line camelcase
const access_key = 'ee9e6ea42766deaefe5bb34abb202d08';

exports.getSupportedCurrentTypes = (req, res) => {
  res.status(200).send(JSON.stringify(['USD', 'EUR', 'CAD', 'GBP']));
};

exports.getCurrencyConvertValue = (req, res) => {
  const model = req.body;
  const { currencyValue, convertFrom, convertTo } = model;
  // eslint-disable-next-line no-unused-vars
  const propertyName = convertFrom + convertTo;
  console.log(`propertyName  ${propertyName}`);
  console.log(`Request for current conver value ${currencyValue}, conevrtFrom: ${convertFrom}, conevrtto: ${convertTo}.`);
  axios({
    method: 'get',
    // eslint-disable-next-line camelcase
    url: `http://apilayer.net/api/live?access_key=${access_key}&currencies=${convertTo}&source=${convertFrom}&format=${currencyValue}`,
  })
    .then((response) => {
      const { quotes } = response.data;
      const [first] = Object.values(quotes);
      res.status(200).send(JSON.stringify(first));
    })
    .catch((error) => {
      console.error(error);
    });
};
