
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
    console.log('derp');
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
    callback(null, 'Some bearer token for your shiz');
};
