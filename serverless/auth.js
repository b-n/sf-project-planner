import jsforce from 'jsforce';
import hasha from 'hasha';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';


import * as env from './env.js';
import db from './db/db.js';

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {
        principalId: principalId
    };
    if (effect && resource) {
        const statementOne = {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        };
        const policyDocument = {
            Version: '2012-10-17',
            Statement: [statementOne]
        };
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

export function authenticate(event, context, callback) {
    if (event.authorizationToken) {
        console.log(event);

        console.log(event.authorizationToken, event.methodArn);
        
        //TODO:
        // check dynamo db to ensure the bearer token is valid (exists + not expired);
        callback(null, generatePolicy('LITERALLYNOTARANDOMSTRING', 'Allow', event.methodArn));
    } else {
        callback('Unauthorized');
    }
}


export function login(event, context, callback) {
    
    const { username, password } = event.body;

    if (!username || !password) {
        callback('Need to specify a username and password for this call');
        return;
    }

    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;
    const conn = new jsforce.Connection({
        loginUrl: SF_ENDPOINT
    });
    
    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, res) => {
        if (err) {
            callback('Error during login');
            return;
        }

        conn.query('SELECT Id, Username__c, Password__c, Salt__c FROM Employee__c where Username__c = \'' + username + '\'', function(err, res) {
            if (err) {
                callback('Wrong Username/Password');
                return;
            }
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

            db.put({
                Item: details,
                TableName: 'sf-project-planner-auth'
            }).promise()
            .then(() => {
                callback(null, details);
            })
            .catch((err) => {
                console.log('error', err);
                callback('Could not login. Try again later');
            });
        });
    });
}


const checkPassword = (password, salt, storedPassword) => {
    const hashedPassword = hasha(password + salt, { encoding: 'base64' });
    return (hashedPassword === storedPassword);
}
