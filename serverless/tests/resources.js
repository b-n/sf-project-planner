import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import messages from '../lib/messages';
import Resources from '../lib/resources';

import SalesforceMock from './mocks/salesforce';

describe('resources', function() {

    const validGET = {
        principalId: 'testingPrincipal',
        method: 'GET',
        query: {
            weekstart: 'startWeek',
            weekend: 'endWeek'
        }
    };

    const validPOST = {
        principalId: 'testingPrincipal',
        method: 'POST',
        body: [
            { Id: 'existing record', Hours__c: 10 },
            { Id: 'delete record', Hours__c: 0 },
            { Id: 'null', Hours__c: 5 } //new record
        ]
    };

    const mock = new SalesforceMock();

    it('fails with no principalId', function(done) {
        const salesforce = mock.getMock();

        const handler = new Resources({ salesforce });

        const { principalId, ...event } = validGET;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_REQUIRE_PRINCIPALID);
            assert.isTrue(mock.getMock('login').notCalled);
            done();
        }
        handler.run({ event, callback });
    });

    it('requires a valid method', function(done) {
        const salesforce = mock.getMock();

        const handler = new Resources({ salesforce });

        const { method, ...event } = validGET;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_INVALID_METHOD);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        }

        handler.run({ event, callback });
    });

    it('fails gracefully if salesforce fails', function(done) {
        const salesforce = mock.getMock({
            login: { resolves: false, value: messages.ERROR_SF_AUTH }
        });

        const handler = new Resources({ salesforce });

        const event = validGET;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_SF_AUTH);
            assert.isTrue(mock.getStub('login').calledOnce);
            done();
        }

        handler.run({ event, callback });
    });

    it('get: requires parameters to proceed', function(done) {
        const salesforce = mock.getMock();

        const handler = new Resources({ salesforce });

        const { query, ...event } = validGET;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_REQUIRE_QUERY_PARAMS);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        }

        handler.run({ event, callback });
    });

    it('get: returns a result', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: { records: validPOST.body }}
        });

        const handler = new Resources({ salesforce });

        const event = validGET;

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.equal(success, validPOST.body);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        }

        handler.run({ event, callback });
    });

    it('post: fails if no body', function(done) {
        const salesforce = mock.getMock({});

        const handler = new Resources({ salesforce });

        const { body, ...event } = validPOST;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_REQUIRE_BODY);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        }

        handler.run({ event, callback });
    });

    it('post: returns a success', function(done) {
        const salesforce = mock.getMock({});

        const handler = new Resources({ salesforce });

        const event = validPOST;

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('resourceUpdate').calledOnce);
            done();
        }

        handler.run({ event, callback });
    });
});
