import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import messages from '../lib/messages';
import Projects from '../lib/projects';

import ClassMock from './mocks/classMock';

describe('projects', function() {

    const mock = new ClassMock([ 'login', 'query', 'forgotPassword', 'resourceUpdate', 'changePassword' ]);

    const validSFReturn = {
        records: [
            { name: 'record1' },
            { name: 'record2' },
            { name: 'record3' },
        ]
    }

    it('returns salesforce records', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        });

        const handler = new Projects({ salesforce });

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.deepEqual(success, validSFReturn.records);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        }

        handler.run({ callback });
    });

    it('fails nicely with no salesforce query/connection', function(done) {
        const salesforce = mock.getMock({
            login: { resolves: false, value: messages.ERROR_SF_AUTH }
        });

        const handler = new Projects({ salesforce });

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_SF_AUTH);
            done();
        }

        handler.run({ callback });
    });
});
