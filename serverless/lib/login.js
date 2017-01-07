import hasha from 'hasha';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import env from './env.js';
import messages from './messages.js';

export function login({ event, callback }, { dynamo, salesforce }) {
    
    const { username, password } = event.body;

    if (!username || !password) {
        callback(messages.REQUIRE_LOGIN);
        return;
    }

    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;

    const conn = new salesforce(SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT);
   
    conn.login().catch(err => { throw new Error(messages.ERROR_SF_AUTH); })
    .then(() => {
        return conn.query('SELECT Id, Username__c, Password__c, Salt__c FROM Employee__c where Username__c = \'' + username + '\'')
        .catch(err => { throw new Error(messages.ERROR_QUERY_FAILED); });
    })
    .then(res => {
        if (!res) {
            throw new Error(messages.ERROR_WRONG_LOGIN);
        }
        const record = res.records[0];
        if (!record || !checkPassword(password, record.Salt__c, record.Password__c)) {
            throw new Error(messages.ERROR_WRONG_LOGIN);
        }
        return {
            bearerToken: hasha(uuidV4(), { encoding: 'hex' }),
            ttl: moment().utc().add(6, 'hours').format(),
            employeeId: record.Id
        };
    })
    .then(details => {
        return dynamo.put({
            Item: details,
            TableName: 'sf-project-planner-auth'
        }).promise()
        .then(() => { return details })
        .catch(err => { throw new Error(messages.ERROR_INTERNAL_ERROR); });
    })
    .then(details => { callback(null, details); })
    .catch(err => { callback(err); });
}

const checkPassword = (password, salt, storedPassword) => {
    const hashedPassword = hasha(password + salt, { encoding: 'base64' });
    return (hashedPassword === storedPassword);
}
