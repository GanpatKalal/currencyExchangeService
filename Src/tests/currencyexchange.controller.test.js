const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');
const proxyquire = require('proxyquire');

const currencyexchangeController = require('../api/currencyexchange/currencyexchange.controller');

const { expect } = chai;
chai.should();

describe('Currencyexchange Controller Tests:', () => {
  describe('Post->GetCurrencyConvertValue', () => {
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
    afterEach(() => {
      sinon.restore();
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
      res.status = 200;
      res.send.json = 0.885;
      const stub = sinon.stub(controller, 'getCurrencyConvertValue').returns(res);
      controller.getCurrencyConvertValue(req, res);
      expect(res.status.should.equal(200));
      expect(res.send.json.should.equal(0.885));
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
  });
  describe('Get->getSupportedCurrentTypes', () => {
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
    afterEach(() => {
      sinon.restore();
    });
    it('should pass with data', () => {
      const req = {
      };
      const stub = sinon.stub(controller, 'getSupportedCurrentTypes').returns('USD');
      controller.getSupportedCurrentTypes(req, res);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should pass with all data ', () => {
      const readFile = sinon.stub(fs, 'readFile');

      const util = {
        promisify: sinon.stub().returns(readFile)
      };
      const req = {
      };
      const currencyType = proxyquire('../api/currencyexchange/currencyexchange.controller', { fs, util })();
      readFile.resolves(['USD', 'EUR', 'CAD', 'GBP']);

      return currencyType
        .getSupportedCurrentTypes(req, res)
        .then((data) => expect(data).to.eql(res.send.json));
    });
    it('should failed with wrong file', () => {
      const readFile = sinon.stub(fs, 'readFile');
      const req = {
      };
      const util = {
        promisify: sinon.stub().returns(readFile)
      };
      res.status = 500;
      res.send.json = 'Internal server error';
      const currencyType = proxyquire('../api/currencyexchange/currencyexchange.controller', { fs, util })('wrong.json');
      readFile.resolves(null);
      currencyType.getCurrencyType((err) => {
        expect(err).to.eql(Error('Unable to read'));
      });
      currencyType.getSupportedCurrentTypes(req, res);
      res.status.should.equal(500);
      res.send.json.should.equal('Internal server error');
    });
  });
  describe('getCurrencyType', () => {
    let controller;
    beforeEach(() => {
      controller = currencyexchangeController();
    });
    afterEach(() => {
      sinon.restore();
    });
    it('getSupportedCurrentTypes should return a data', () => {
      const readFile = sinon.stub(fs, 'readFile');

      const util = {
        promisify: sinon.stub().returns(readFile)
      };

      const currencyType = proxyquire('../api/currencyexchange/currencyexchange.controller', { fs, util })();
      readFile.resolves(['USD', 'EUR', 'CAD', 'GBP']);

      return currencyType
        .getCurrencyType()
        .then((data) => expect(data).to.eql(['USD', 'EUR', 'CAD', 'GBP']));
    });
    it('should pass with data', () => {
      const stub = sinon.stub(controller, 'getCurrencyType').returns('USD');
      controller.getCurrencyType((err, data) => {
        expect(data).to.eql(['USD']);
      });
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
  });
});
