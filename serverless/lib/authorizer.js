import jwt from 'jsonwebtoken';
import env from './env.js';

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
            //Resource: 'arn:aws:execute-api:us-east-1:*:*:*'
        };
        const policyDocument = {
            Version: '2012-10-17',
            Statement: [statementOne]
        };
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

export function authorizer({ event, callback }) {
    console.log(event.methodArn);

    const token = event.authorizationToken;

    if (!token) {
        callback('No bearer token supplied');
        return;
    }

    try {
        const jwtToken = jwt.verify(
            event.authorizationToken.replace('Bearer ', ''),
            env.JWT_SECRET,
            { algorithm: 'HS256' }
        );

        callback(null, generatePolicy(jwtToken.employeeId, 'Allow', event.methodArn));

    } catch (e) {
        callback('Invalid token');
        console.log(e.message);
        return;
    }
}
