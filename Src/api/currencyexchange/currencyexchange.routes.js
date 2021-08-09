const express = require('express');

const currencyexchangeController = require('./currencyexchange.controller');

const router = express.Router();
const controller = currencyexchangeController();

/**
 * @swagger
 * /api/currencyexchange/getSupportedCurrentTypes:
 *   get:
 *     summary: Get all SupportedCurrentTypes.
 *     description: Get all SupportedCurrentTypes
 *     responses:
 *       200:
 *         description: Success *
 */
router.get('/getSupportedCurrentTypes', controller.getSupportedCurrentTypes);

/**
 * @swagger
 * /api/currencyexchange:
 *   post:
 *     summary: Convert the currency value.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {currencyValue: 111,convertFrom: 'USD', convertTo: 'EUR'}
 *     responses:
 *       200:
 *         description: Convert the currency value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.post('/', controller.getCurrencyConvertValue);

module.exports = router;
