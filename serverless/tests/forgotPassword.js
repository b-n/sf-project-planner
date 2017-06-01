import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import messages from '../lib/messages';
import ForgotPassword from '../lib/forgotPassword';

import ClassMock from './mocks/classMock';

describe('forgotPassword', function() {

    const validRequest = {
        body: {
            username: 'testing@test.com'
        }
    };

    const mock = new ClassMock([ 'login', 'query', 'forgotPassword', 'resourceUpdate', 'changePassword' ]);

    it('run: with a username supplied', function(done) {
        const salesforce = mock.getMock();

        const handler = new ForgotPassword({ salesforce });

        const event = validRequest;

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('forgotPassword').calledOnce);
            done();
        }
        handler.run({ event, callback });
    });

    it('no username supplied', function(done) {
        const salesforce = mock.getMock();

        const handler = new ForgotPassword({ salesforce });

        const event = {};

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_NO_USERNAME);
            done();
        }

        handler.run({ event, callback });
    });

    it('salesforce forgotPassword error', function(done) {
        const salesforce = mock.getMock({
            forgotPassword: { resolves: false, value: messages.ERROR_REST_RESOURCE }
        });

        const handler = new ForgotPassword({ salesforce });

        const event = validRequest;

        const callback = (error, success) => {
            assert.strictEqual(error, messages.ERROR_REST_RESOURCE);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('forgotPassword').calledOnce);
            done();
        }

        handler.run({ event, callback });
    });
});
