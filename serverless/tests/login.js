import { assert } from 'chai';
import { assert as sinonAssert } from 'sinon';
sinonAssert.expose(assert, { prefix: "" });
import hasha from 'hasha';

import messages from '../lib/messages';
import Login from '../lib/login';

import ClassMock from './mocks/classMock';

describe('login', function() {
    process.env.JWT_SECRET = 'TESTING SECRET';
    const password = 'testingPassword';
    const salt = 'passwordSalt';
    const employeeId = 'RandomRecordId';

    const validSFReturn = {
        records: [
            {
                Password__c: hasha(password + salt, { encoding: 'base64' }),
                Salt__c: salt,
                Id: employeeId
            }
        ]
    };

    const validLoginEvent = {
        body: {
            username: 'testing',
            password
        }
    }

    const validChangePasswordEvent = {
        body: {
            username: 'testing',
            oldPassword: password,
            password: 'testingPasswordNew'
        }
    }

    const mock = new ClassMock([ 'login', 'query', 'forgotPassword', 'resourceUpdate', 'changePassword' ]);

    it('[login] accepts valid username and password', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        });

        const handler = new Login({ salesforce });
        const event = validLoginEvent;

        const callback = (error, success) => {
            assert.notEqual(success, null);
            assert.notEqual(success.token, null);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.login({ event, callback });
    });

    it('[login] errors if no username/password supplied', function(done) {
        const salesforce = mock.getMock();

        const handler = new Login({ salesforce });
        const event = {};

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_REQUIRE_BODY);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        };

        handler.login({ event, callback });
    });

    it('[login] fails on bad username/password', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        });

        const handler = new Login({ salesforce });
        const event = {
            body: {
                username: 'test',
                password: 'notTheRealPassword'
            }
        };

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_WRONG_LOGIN);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.login({ event, callback });
    });

    it('[changePassword] changes a password successfully', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn },
            changePassword: { resolves: true, value: 'testing' }
        })

        const handler = new Login({ salesforce });
        const event = validChangePasswordEvent;

        const callback = (error, success) => {
            assert.equal(success, 'testing');
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            assert.isTrue(mock.getStub('changePassword').calledOnce);
            done();
        }

        handler.changePassword({ event, callback })
    });

    it('[changePassword] fails on current password is wrong', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: true, value: validSFReturn }
        })

        const handler = new Login({ salesforce });
        const event = {
            body: {
                username: 'testing',
                oldPassword: 'notAValidOldPassword',
                password: 'testingPasswordNew'
            }
        }

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_WRONG_LOGIN);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            assert.isTrue(mock.getStub('changePassword').notCalled);
            done();
        }

        handler.changePassword({ event, callback })
    });

    it('errors if missing body key', function(done) {
        const salesforce = mock.getMock();

        const handler = new Login({ salesforce })
        const event = { body: { username: 'test' } };

        const callback = (error, success) => {
            assert.isTrue(error.indexOf(messages.ERROR_MISSING_BODY_KEYS) !== -1);
            assert.isTrue(mock.getStub('login').notCalled);
            done();
        }

        handler.login({ event, callback })
    });

    it('fails nicely if salesforce connection fails', function(done) {
        const salesforce = mock.getMock({
            query: { resolves: false, value: messages.ERROR_SF_QUERY_FAILED }
        });

        const handler = new Login({ salesforce });
        const event = validLoginEvent;

        const callback = (error, success) => {
            assert.equal(error, messages.ERROR_SF_QUERY_FAILED);
            assert.isTrue(mock.getStub('login').calledOnce);
            assert.isTrue(mock.getStub('query').calledOnce);
            done();
        };

        handler.login({ event, callback });
    });
});
