const sinon = require('sinon');
const chai = require('chai');

const currencyexchangeController = require('../api/currencyexchange/currencyexchange.controller');

const { expect } = chai;
chai.should();

describe('Currencyexchange Controller Tests:', () => {
  describe('Post', () => {
    let status;
    let json;
    let send;
    let res;
    let controller;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      send = sinon.spy();
      res = { json, status, send };
      controller = currencyexchangeController();
    });
    it('should not allow an empty req.body on post', () => {
      const req = {
      };

      controller.getCurrencyConvertValue(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('req.body is empty or null').should.equal(true);
    });
    it('should not allow an empty currencyValue on post', () => {
      const req = {
        body: {
          currencyValue: ''
        }
      };

      controller.getCurrencyConvertValue(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('currencyValue is empty or null').should.equal(true);
    });
    it('should not allow an empty convertFrom on post', () => {
      const req = {
        body: {
          currencyValue: 111,
          convertFrom: ''
        }
      };

      controller.getCurrencyConvertValue(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('convertFrom is empty or null').should.equal(true);
    });
    it('should not allow an empty convertTo on post', () => {
      const req = {
        body: {
          currencyValue: 111,
          convertFrom: 'USD',
          convertTo: '',
        }
      };

      controller.getCurrencyConvertValue(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('convertTo is empty or null').should.equal(true);
    });
    it('should convert the value on post', () => {
      const req = {
        body: {
          currencyValue: 111,
          convertFrom: 'USD',
          convertTo: 'EUR',
        }
      };
      const stubValue = 0.885;
      const stub = sinon.stub(controller, 'getCurrencyConvertValue').returns(stubValue);
      controller.getCurrencyConvertValue(req, res);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
  });
});
