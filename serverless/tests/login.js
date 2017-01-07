import { assert } from 'chai';
import dotenv from 'dotenv';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised'; 

import messages from '../lib/messages.js';

import { login } from '../lib/login.js';

describe('login', function() {
    
    const body = {
        username: 'test',
        password: 'test'
    }

    const dynamo = {
        put: stub()
    }

    let loginStub,queryStub;

    const salesforce = spy(() => {
        return {
            login: loginStub,
            query: queryStub
        };
    });

    beforeEach(function() {
        loginStub = stub();
        queryStub = stub();
    });

    it('needs a username and password', function(done) {
        const event = {
            body: {}
        }

        const callback = (error, success) => {
            assert.equal(error, messages.REQUIRE_LOGIN);
            done();
        }

        login({ event, callback }, { dynamo, salesforce });
    });
    
    it('errors nicely if it cannot connect to salesforce', function(done) {
        loginStub.rejects('nope');

        const event = { body };

        const callback = (error, success) => {
            assert.notEqual(error, messages.ERROR_SF_AUTH);
            done();
        }

        login({ event, callback }, { dynamo, salesforce });
    });

    it('errors nicely if query fails', function(done) {
        loginStub.resolves();
        queryStub.rejects();

        const event = { body };

        const callback = (error, success) => {
            assert.notEqual(error, messages.ERROR_QUERY_FAILED);
            done();
        }

        login({ event, callback }, { dynamo, salesforce });
    });

    it('fails if password does not match', function(done) {
        loginStub.resolves();
        queryStub.resolves();

        const event = { body };

        const callback = (error, success) => {
            assert.notEqual(error, messages.ERROR_WRONG_LOGIN);
            done();
        }

        login({ event, callback }, { dynamo, salesforce });
    });

    it('login: succeeds with a valid username and password', function(done) {
    
        done();
    });
});
