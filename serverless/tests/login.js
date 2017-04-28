import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import hasha from 'hasha';

import messages from '../lib/messages';
import Login from '../lib/login';

import SalesforceMock from './mocks/salesforce';

describe('login', function() {
    process.env.JWT_SECRET = 'TESTING SECRET';
    const password = 'testingPassword';
    const salt = 'passwordSalt';
    const employeeId = 'RandomRecordId';

    const validSFReturn = {
        records: [
            {
                Password__c: hasha(password + salt, { encoding: 'base64' }),
                Salt__c: salt,
                Id: employeeId
            }
        ]
    };

    const validEvent = {
        body: {
            username: 'testing',
            password
        }
    }

    const mock = new SalesforceMock();

    it('accepts valid username and password', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        });

        const handler = new Login({ salesforce });
        const event = validEvent;

        const callback = (error, success) => {
            assert.notEqual(success, null);
            assert.notEqual(success.token, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.run({ event, callback });
    });

    it('errors if no username/password supplied', function(done) {
        const salesforce = mock.getMock();

        const handler = new Login({ salesforce });
        const event = {};

        const callback = (error, success) => {
            assert.equal(error, messages.REQUIRE_LOGIN);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        };

        handler.run({ event, callback });
    });

    it('fails on bad username/password', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        });

        const handler = new Login({ salesforce });
        const event = {
            body: {
                username: 'test',
                password: 'notTheRealPassword'
            }
        };

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_WRONG_LOGIN);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.run({ event, callback });
    });

    it('fails nicely if salesforce connection fails', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: false, value: messages.ERROR_SF_QUERY_FAILED }
        });

        const handler = new Login({ salesforce });
        const event = validEvent;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_SF_QUERY_FAILED);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.run({ event, callback });
    });
});
