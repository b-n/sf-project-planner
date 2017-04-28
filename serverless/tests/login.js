import { assert } from 'chai';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised';

import hasha from 'hasha';

import messages from '../lib/messages.js';
import Login from '../lib/login.js';

describe('login', function() {
    process.env.JWT_SECRET = 'TESTING SECRET';
    const password = 'testingPassword';
    const salt = 'passwordSalt';
    const employeeId = 'RandomRecordId';

    function generateSFRecord() {
        const hashedPassword = hasha(password + salt, { encoding: 'base64' });
        return {
            Password__c: hashedPassword,
            Salt__c: salt,
            Id: employeeId
        };
    }

    const loginStub = stub();
    const queryStub = stub();

    loginStub.resolves();
    queryStub.resolves({ records: [ generateSFRecord() ]});

    const salesforce = spy(() => {
        return {
            login: loginStub,
            query: queryStub
        };
    });

    beforeEach(function() {
        loginStub.reset();
        queryStub.reset();
    });

    it('run: end to end works', function(done) {
        const handler = new Login({ salesforce });

        const event = {
            body: {
                username: 'testing',
                password: password
            }
        }

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.notEqual(success, null);
            assert(loginStub.calledOnce);
            assert(queryStub.calledOnce);
            done();
        }
        handler.run({ event, callback });
    });

    it('constructor: generates and stores deps', function() {
        const handler = new Login({ salesforce });

        assert.equal(handler.salesforce, salesforce);
    });

    it('validate: requires event and body', function(done) {
        const handler = new Login({ salesforce });

        handler.validate()
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.REQUIRE_LOGIN);
            done();
        });
    });

    it('validate: no username/pass', function(done) {
        const handler = new Login({ salesforce });

        const event = {
            body: {}
        }

        handler.validate(event)
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.REQUIRE_LOGIN);
            done();
        });
    });

    it('validate: successful stores username and password', function(done) {
        const handler = new Login({ salesforce });

        const event = {
            body: {
                username: 'test',
                password: 'test'
            }
        }

        handler.validate(event)
        .then(() => { done() })
        .catch(done);
    });

    it('generateConnection: generates connection and stores in this.conn', function(done) {
        const handler = new Login({ salesforce });

        handler.generateConnection()
        .then(() => { done() })
        .catch(done);
    });

    it('runQuery: queries from salesforce', function(done) {
        const handler = new Login({ salesforce });
        handler.generateConnection();
        handler.username = 'testing';

        handler.runQuery()
        .then(() => { done() })
        .catch(done);
    });

    it('parseRecord: no result passed', function(done) {
        const handler = new Login({ salesforce });

        handler.parseRecord()
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.ERROR_WRONG_LOGIN);
            done();
        });
    });

    it('parseRecord: password does not match', function(done) {
        const handler = new Login({ salesforce });
        handler.password = 'not valid';

        const result = {
            records: [
                {
                    Password__c: 'not valid',
                    Salt__c: 'not valid'
                }
            ]
        };

        handler.parseRecord(result)
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.ERROR_WRONG_LOGIN);
            done();
        });
    });

    it('parseRecord: password matches and we have a result', function(done) {
        const handler = new Login({ salesforce });
        handler.password = password;

        const queryResult = {
            records: [
                generateSFRecord()
            ]
        };

        handler.parseRecord(queryResult)
        .then(result => {
            assert.equal(result, employeeId);
            done();
        })
        .catch(done);
    });

    it('checkPassword: password matches', function() {
        const sfRecord = generateSFRecord();

        assert.equal(Login.checkPassword(password, salt, sfRecord.Password__c), true);
    });

    it('generateToken: generates token', function(done) {
        const handler = new Login({ salesforce });

        const checkResult = {
            employeeId: 'random employeeId'
        };

        handler.generateToken(checkResult)
        .then(result => {
            assert.notEqual(null, result);
            done();
        })
        .catch(err => done);
    });
});
