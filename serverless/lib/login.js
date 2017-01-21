import hasha from 'hasha';
import jwt from 'jsonwebtoken';
import env from './env.js'

import messages from './messages.js';

export default class Login {
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;

        this.validate(event)
        .then(result => { return this.generateConnection(result) })
        .then(result => { return this.runQuery(result) })
        .then(result => { return this.parseRecord(result) })
        .then(result => { return this.generateToken(result) })
        .then(result => { return this.sendCallback(result) })
        .catch(result => { return this.errorCallback(result) });
    }

    validate(event) {
        if (!event || !event.body) {
            return Promise.reject(new Error(messages.REQUIRE_LOGIN));
        }

        const { username, password } = event.body;
        if (!username || !password) {
            return Promise.reject(new Error(messages.REQUIRE_LOGIN));
        }

        this.username = username;
        this.password = password;
        return Promise.resolve();
    }

    generateConnection() {
        this.conn = new this.salesforce();

        return this.conn.login();
    }

    runQuery() {
        return this.conn.query(`SELECT Id, Username__c, Password__c, Salt__c
                                FROM   Employee__c where Username__c = '${this.username}'`);
    }

    parseRecord(res) {
        if (!res) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN));
        }

        const record = res.records[0];
        if (!record || !Login.checkPassword(this.password, record.Salt__c, record.Password__c)) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN));
        }

        return Promise.resolve(record.Id);
    }

    generateToken(record) {
        const token = jwt.sign(
            { employeeId: record },
            env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h'
            }
        );

        return Promise.resolve({ token });
    }

    sendCallback(result) {
        this.callback(null, result);
    }

    errorCallback(error) {
        this.callback(error);
    }

    static checkPassword(password, salt, storedPassword) {
        const hashedPassword = hasha(password + salt, { encoding: 'base64' });
        return (hashedPassword === storedPassword);
    }
}
