const jsforce = require('jsforce');
const hasha = require('hasha');
const env = require('./env.js');


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

module.exports.authenticate = (event, context, callback) => {
    if (event.authorizationToken) {
        console.log(event.authorizationToken, event.methodArn);
        
        //TODO:
        // check dynamo db to ensure the bearer token is valid (exists + not expired);
        callback(null, generatePolicy('LITERALLYNOTARANDOMSTRING', 'Allow', event.methodArn));
    } else {
        callback('Unauthorized');
    }
};


module.exports.login = (event, context, callback) => {
    
    console.log(event);
    const { username, password } = event.body;

    if (!username || !password) return callback('Need to specify a username and password for this call');
    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;

    const conn = new jsforce.Connection({
        loginUrl: SF_ENDPOINT
    });
    
    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, res) => {
        if (err) console.log(err);
        conn.query('SELECT Username__c, Password__c, Salt__c FROM Employee__c where Username__c = \'' + username + '\'', function(err, res) {
            const record = res.records[0];

            const hashedPassword = hasha(password + record.Salt__c, { encoding: 'base64' });
            callback(null, { hashedPassword, recordPassword: record.Password__c, matches: hashedPassword === record.Password__c });
        });
    });
};
