import { assert } from 'chai';
import { stub, spy, createStubInstance, assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import 'sinon-as-promised';

import messages from '../lib/messages';
import ForgotPassword from '../lib/forgotPassword';

describe('forgotPassword', function() {

    const validRequest = {
        body: {
            username: 'testing@test.com'
        }
    };

    const loginStub = stub();
    const forgotPasswordStub = stub();

    loginStub.resolves();
    forgotPasswordStub.resolves();

    const salesforce = spy(() => {
        return {
            login: loginStub,
            forgotPassword: forgotPasswordStub
        };
    });

    it('run: end to end works', function(done) {
        const handler = new ForgotPassword({ salesforce });

        const event = validRequest;

        const callback = (error, success) => {
            assert.equal(error, null);
            assert.isTrue(loginStub.calledOnce);
            assert.isTrue(forgotPasswordStub.calledOnce);
            done();
        }
        handler.run({ event, callback });
    });

    it('constructor: stores deps', function() {
        const handler = new ForgotPassword({ salesforce });

        assert(handler.salesforce, salesforce);
    });

    it('validate: username is required', function(done) {
        const handler = new ForgotPassword({ salesforce });

        const event = {};

        handler.validate(event)
            .then(done)
            .catch((err) => {
                assert.equal(err.message, messages.ERROR_NO_USERNAME);
                done()
            });
    });

    it('validate: username exists', function(done) {
        const handler = new ForgotPassword({ salesforce });

        const event = validRequest;

        handler.validate(event)
            .then(() => { done() })
            .catch(done);
    });

    it('generateConnection: generates connection and stores in this.conn', function(done) {
        const handler = new ForgotPassword({ salesforce });

        handler.generateConnection()
        .then(() => { done() })
        .catch(done);
    });

    it('sendForgotPassword: send request to Salesforce', function(done) {
        const handler = new ForgotPassword({ salesforce });
        handler.generateConnection();

        handler.sendForgotPassword()
        .then(() => { done() })
        .catch(done);
    });
});
