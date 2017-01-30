import jwt from 'jsonwebtoken';

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {
        principalId: principalId
    };

    if (effect && resource) {
        const tmp = resource.split(':');
        const apiGatewayArnTmp = tmp[5].split('/');
        const awsAccountId = tmp[4];
        const region = tmp[3];

        const restApiId = apiGatewayArnTmp[0];
        const stage = apiGatewayArnTmp[1];

        const newResource = 'arn:aws:execute-api:' + region + ':' + awsAccountId + ':' + restApiId + '/' + stage + '/*/*'

        const statementOne = {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: newResource
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
    const token = event.authorizationToken;

    if (!token) {
        callback('No bearer token supplied');
        return;
    }

    try {
        const jwtToken = jwt.verify(
            event.authorizationToken.replace('Bearer ', ''),
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
        );

        callback(null, generatePolicy(jwtToken.employeeId, 'Allow', event.methodArn));

    } catch (e) {
        callback('Invalid token');
        console.log(e.message);
        return;
    }
}
