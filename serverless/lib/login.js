import hasha from 'hasha';
import jwt from 'jsonwebtoken';

import messages from './messages';

export default class Login {
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;

        this.validate(event)
        .then(() => { return this.generateConnection() })
        .then(() => { return this.runQuery() })
        .then(result => { return this.parseRecord(result) })
        .then(result => { return this.generateToken(result) })
        .then(result => { return this.callback(null, result) })
        .catch(result => { return this.callback(result.message) });
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
        const record = res.records[0];
        if (!record || !Login.checkPassword(this.password, record.Salt__c, record.Password__c)) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN));
        }

        return Promise.resolve(record.Id);
    }

    generateToken(record) {
        const token = jwt.sign(
            { employeeId: record },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h'
            }
        );

        return Promise.resolve({ token });
    }

    static checkPassword(password, salt, storedPassword) {
        const hashedPassword = hasha(password + salt, { encoding: 'base64' });
        return (hashedPassword === storedPassword);
    }
}
