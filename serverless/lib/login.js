import hasha from 'hasha';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import * as env from './env.js';

export function login({ event, callback }, { dynamo, salesforce }) {
    
    const { username, password } = event.body;

    if (!username || !password) {
        callback('Need to specify a username and password for this call');
        return;
    }

    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;

    const conn = new salesforce(SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT);
   
    conn.login()
    .catch(err => {
        callback('Could not connect to salesforce to authenticate');
    })
    .then(() => {
        console.log(conn);
        return conn.query('SELECT Id, Username__c, Password__c, Salt__c FROM Employee__c where Username__c = \'' + username + '\'');    
    })
    .catch(err => {
        callback('Could not query salesforce'); 
    })
    .then(res => {
        const record = res.records[0];
        if (!checkPassword(password, record.Salt__c, record.Password__c)) {
            callback('Wrong Username/Password');
            return;
        }
        const details = {
            bearerToken: hasha(uuidV4(), { encoding: 'hex' }),
            ttl: moment().utc().add(6, 'hours').format(),
            employeeId: record.Id
        };

        return dynamo.put({
            Item: details,
            TableName: 'sf-project-planner-auth'
        }).promise().then(() => { return details });
    })
    .then(details => {
        callback(null, details);
    })
    .catch(err => {
        callback('Could not login. Try again later');
    });
}

const checkPassword = (password, salt, storedPassword) => {
    const hashedPassword = hasha(password + salt, { encoding: 'base64' });
    return (hashedPassword === storedPassword);
}
