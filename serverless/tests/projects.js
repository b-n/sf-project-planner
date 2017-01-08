import { assert } from 'chai';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised'; 

import messages from '../lib/messages.js';
import Projects from '../lib/projects.js';

describe('projects', function() {
    
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

    it('run: end to end works', function(done) {
        const handler = new Projects({ salesforce });
        
        const callback = (error, success) => {
            assert.equal(error, null);
            assert.deepEqual(success, generateSFRecords());
            done(); 
        }
        handler.run({ callback });
    });

    it('constructor: stores deps', function() {
        const handler = new Projects({ salesforce });

        assert(handler.salesforce, salesforce);
    });

    it('generateConnection: generates connection and stores in this.conn', function(done) {
        const handler = new Projects({ salesforce });
        
        handler.generateConnection()
        .then(() => { done() })
        .catch(done);
    });

    it('runQuery: queries from salesforce', function(done) {
        const handler = new Projects({ salesforce });
        handler.generateConnection();
        
        handler.runQuery()
        .then(() => { done() })
        .catch(done);
    });

    it('parseQueryResult: returns empty array if no results', function(done) {
        const handler = new Projects({ salesforce });

        handler.parseQueryResult()
        .then(result => {
            assert.deepEqual(result, []);
            done();
        })
        .catch(done);
    });

    it('parseQueryResult: returns records if there are some', function(done) {
        const handler = new Projects({ salesforce });
        
        const records = generateSFRecords(); 

        const queryResult = {
            records
        }
        handler.parseQueryResult(queryResult)
        .then(result => {
            assert.deepEqual(result, records);
            done();
        })
        .catch(done);
    });

    it('sendCallback: calls', function(done) {
        const message = 'success';
        const handler = new Projects({ salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, null);
            assert.equal(success, message);
            done();
        };

        handler.sendCallback(message);
    })

    it('errorCallback: calls', function(done) {
        const message = 'error';
        const handler = new Projects({ salesforce });
        handler.callback = (error, success) => {
            assert.equal(error, message);
            assert.equal(success, null);
            done();
        };

        handler.errorCallback(message);
    })
});
