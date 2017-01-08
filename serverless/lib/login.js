import hasha from 'hasha';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import env from './env.js';
import messages from './messages.js';

export default class Login {
    constructor({ dynamo, salesforce }) {
        this.dynamo = dynamo;
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;    

        this.validate(event)
        .then(result => { return this.generateConnection(result) })
        .then(result => { return this.runQuery(result) })
        .then(result => { return this.parseRecord(result) })
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
        const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;

        this.conn = new this.salesforce(SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT);
        
        return this.conn.login();
    }

    runQuery() {
        return this.conn.query('SELECT Id, Username__c, Password__c, Salt__c FROM Employee__c where Username__c = \'' + this.username + '\'');
    }

    parseRecord(res) {
        if (!res) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN));
        }

        const record = res.records[0];
        if (!record || !Login.checkPassword(this.password, record.Salt__c, record.Password__c)) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN));
        }

        return Promise.resolve({
            bearerToken: hasha(uuidV4(), { encoding: 'hex' }),
            ttl: moment().utc().add(6, 'hours').format(),
            employeeId: record.Id
        });
    }

    updateDynamo(record) {
        //TODO: this should be in the dynamo class
        return this.dynamo.put({
            Item: record,
            TableName: 'sf-project-planner-auth'
        }).promise()
        .then(() => record)
        .catch(err => { throw new Error(messages.ERROR_INTERNAL_ERROR); });
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
