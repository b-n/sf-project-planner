import { assert } from 'chai';
import dotenv from 'dotenv';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised'; 

import hasha from 'hasha';

import messages from '../lib/messages.js';
import Login from '../lib/login.js';

describe('login', function() {
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

    const dynamoStub = stub();
    const loginStub = stub();
    const queryStub = stub();
    
    dynamoStub.resolves();
    loginStub.resolves();
    queryStub.resolves({ records: [ generateSFRecord() ]});

    const dynamo = {
        put: () => { return { promise: dynamoStub }; }
    }

    const salesforce = spy(() => {
        return {
            login: loginStub,
            query: queryStub
        };
    });

    it('run: end to end works', function(done) {
        const handler = new Login({ dynamo, salesforce });
        
        const event = {
            body: {
                username: 'testing',
                password: password
            }
        }

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.notEqual(success, null);
            done(); 
        }
        handler.run({ event, callback });
    });

    it('constructor: generates and stores deps', function() {
        const handler = new Login({ dynamo, salesforce });

        assert.equal(handler.dynamo, dynamo);
        assert.equal(handler.salesforce, salesforce);
    });
    
    it('validate: requires event and body', function(done) {
        const handler = new Login({ dynamo, salesforce });
        
        handler.validate()
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.REQUIRE_LOGIN);
            done();
        });
    });

    it('validate: no username/pass', function(done) {
        const handler = new Login({ dynamo, salesforce });
        
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
        const handler = new Login({ dynamo, salesforce });
        
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
        const handler = new Login({ dynamo, salesforce });
        
        handler.generateConnection()
        .then(() => { done() })
        .catch(done);
    });

    it('runQuery: queries from salesforce', function(done) {
        const handler = new Login({ dynamo, salesforce });
        handler.generateConnection();
        handler.username = 'testing';
        
        handler.runQuery()
        .then(() => { done() })
        .catch(done);
    });

    it('parseRecord: no result passed', function(done) {
        const handler = new Login({ dynamo, salesforce });
        
        handler.parseRecord()
        .then(() => { done('this should have failed') })
        .catch((err) => {
            assert.equal(err.message, messages.ERROR_WRONG_LOGIN);
            done();
        });
    });

    it('parseRecord: password does not match', function(done) {
        const handler = new Login({ dynamo, salesforce });
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
        const handler = new Login({ dynamo, salesforce });
        handler.password = password;
        
        const queryResult = {
            records: [
                generateSFRecord()
            ]
        };

        handler.parseRecord(queryResult)
        .then(result => {
            assert.notEqual(result.bearerToken);
            assert.notEqual(result.ttl);
            assert.equal(result.employeeId, employeeId);
            done();
        })
        .catch(done);
    });

    it('checkPassword: password matches', function() {
        const sfRecord = generateSFRecord();

        assert.equal(Login.checkPassword(password, salt, sfRecord.Password__c), true);
    });

    it('updateDynamo: update succeeds', function(done) {
        const handler = new Login({ dynamo, salesforce });
        
        const queryResult = {
            bearerToken: 'random bearer token',
            ttl: 'some ttl string',
            employeeId: 'random employeeId'
        };

        handler.updateDynamo(queryResult)
        .then(result => {
            assert.deepEqual(result, queryResult);
            done();
        })
        .catch(err => done);
    });

    it('sendCallback: calls', function(done) {
        const message = 'success';
        const handler = new Login({ dynamo, salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, null);
            assert.equal(success, message);
            done();
        };

        handler.sendCallback(message);
    })

    it('errorCallback: calls', function(done) {
        const message = 'error';
        const handler = new Login({ dynamo, salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, message);
            assert.equal(success, null);
            done();
        };

        handler.errorCallback(message);
    })

});
