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

    it('runQuery: return query from salesforce', function(done) {
        const handler = new Projects({ salesforce });
        handler.generateConnection();

        handler.runQuery()
        .then(() => { done() })
        .catch(done);
    });
});
