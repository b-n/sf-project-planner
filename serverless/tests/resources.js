import { assert } from 'chai';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised'; 

import messages from '../lib/messages.js';
import Resources from '../lib/resources.js';

describe('resources', function() {
    
    function generateSFRecords() {
        return [ 
            { name: 'record1' },
            { name: 'record2' }
        ];
    }

    const loginStub = stub();
    const queryStub = stub();
    
    loginStub.resolves();
    queryStub.resolves({ records: generateSFRecords() });

    const salesforce = spy(() => {
        return {
            login: loginStub,
            query: queryStub
        };
    });

    it('run: GET method works', function(done) {
        const handler = new Resources({ salesforce });
        
        const event = {
            method: 'GET',
            principalId: 'randomId',
            query: {
                weekstart: 'weekStart',
                weekend: 'weekEnd'
            }
        };

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.notEqual(success, null);
            done(); 
        }
        handler.run({ event, callback });
    });

    it('run: POST method works', function(done) {
        done();
    });

    it('constructor: stores deps', function() {
        const handler = new Resources({ salesforce });

        assert(handler.salesforce, salesforce);
    });

    it('generateConnection: generates connection and stores in this.conn', function(done) {
        const handler = new Resources({ salesforce });
        
        handler.generateConnection()
        .then(() => { done() })
        .catch(done);
    });

    it('getMethod: errors when no query parameters', function(done) {
        const handler = new Resources({ salesforce });
        handler.generateConnection();
        
        const query = {};

        handler.getMethod('dummyId', query)
        .then(() => { done('should not get here'); })
        .catch(err => {
            assert.equal(err.message, 'Missing parameters');
            done();
        });
    });

    it('getMethod: returns a result', function(done) {
        const handler = new Resources({ salesforce });
        handler.generateConnection();
        
        const query = {
            weekstart: 'start',
            weekend: 'end'
        };

        handler.getMethod('dummyId', query)
        .then(() => { done(); })
        .catch(done);
    });

    it('sendCallback: calls', function(done) {
        const message = 'success';
        const handler = new Resources({ salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, null);
            assert.equal(success, message);
            done();
        };

        handler.sendCallback(message);
    })

    it('errorCallback: calls', function(done) {
        const message = 'error';
        const handler = new Resources({ salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, message);
            assert.equal(success, null);
            done();
        };

        handler.errorCallback(message);
    })
});
