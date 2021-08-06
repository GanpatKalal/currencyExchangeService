const express = require('express');

const currencyexchangeController = require('./currencyexchange.controller');

const router = express.Router();
const controller = currencyexchangeController();
router.get('/getSupportedCurrentTypes', controller.getSupportedCurrentTypes);
router.post('/', controller.getCurrencyConvertValue);

module.exports = router;
