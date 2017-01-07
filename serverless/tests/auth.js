import { assert } from 'chai';
import dotenv from 'dotenv';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import * as auth from '../auth.js';

describe('auth', function() {
    
    let dummyPromise, salesforceStub;

    before(function() {
        dummyPromise = stub();
        
        console.log('authSalesforce', auth.deps.conn);
        auth.deps.conn = {
            login: dummyPromise,
            query: dummyPromise
        };
        console.log(auth.deps.conn);
    });


    it('login: needs a username and password', function(done) {
        const event = {
            body: {}
        }

        auth.login(event, {}, (error, success) => {
            assert.notEqual(error, null);
            done();
        });
    });
    
    it('login: errors nicely if it cannot connect to salesforce', function(done) {
        
        const event = {
            body: { 
                username: 'test',
                password: 'test'
            }
        }

        auth.login(event, {}, (error, success) => {
            console.log(error, success);
            assert.notEqual(error, null);
            done();
        });
    });

    it('login: errors nicely if query fails', function(done) {
    
        done();
    });

    it('login: fails if password does not match', function(done) {
    
        done();
    });

    it('login: succeeds with a valid username and password', function(done) {
    
        done();
    });
});

/*(() =>{
    const event = {
        body: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    };
    
    const cb = (err, res) => {
        console.log(err, res);
    };

    auth.login(event, {}, cb);
})();*/
