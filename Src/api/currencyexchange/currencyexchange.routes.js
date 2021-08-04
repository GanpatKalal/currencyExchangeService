const express = require('express');

const controller = require('./currencyexchange.controller');

const router = express.Router();

router.get('/getSupportedCurrentTypes', controller.getSupportedCurrentTypes);
router.post('/', controller.getCurrencyConvertValue);

module.exports = router;
