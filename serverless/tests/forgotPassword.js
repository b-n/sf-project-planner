import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });

import messages from '../lib/messages';
import ForgotPassword from '../lib/forgotPassword';

import SalesforceMock from './mocks/salesforce';

describe('forgotPassword', function() {

    const validRequest = {
        body: {
            username: 'testing@test.com'
        }
    };

    const mock = new SalesforceMock();

    it('run: with a username supplied', function(done) {
        const handler = new ForgotPassword({ salesforce: mock.getMock() });

        const event = validRequest;

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            done();
        }
        handler.run({ event, callback });
    });

    it('no username supplied', function(done) {
        const handler = new ForgotPassword({ salesforce: mock.getMock() });

        const event = {};

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_NO_USERNAME);
            done();
        }

        handler.run({ event, callback });
    });

    it('salesforce forgotPassword error', function(done) {
        const handler = new ForgotPassword({ salesforce: mock.getMock({ failStubs: [ 'forgotPassword' ]}) });

        const event = validRequest;

        const callback = (error, success) => {
            assert.equal(success, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('forgotPassword').calledOnce);
            done();
        }

        handler.run({ event, callback });
    });
});
