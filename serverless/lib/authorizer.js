import moment from 'moment';

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

const generateParams = (bearer) => {
    return {
        Key: {
            bearerToken: bearer
        },
        TableName: 'sf-project-planner-auth'
    };
};

export function authorizer({ event, callback }, { dynamo }) {

    if (event.authorizationToken) {

        const paramsForGet = generateParams(event.authorizationToken.replace('Bearer ', ''));

        dynamo.get(paramsForGet).promise()
            .then((data) => {

                //TODO: fix error in how time is stored in db (in login function and below with newTtl)
                if (moment(data.Item.ttl).isBefore(moment())) throw new Error('Unauthorized');
                return data.Item;
            })
            .then((item) => {

                const newTtl = moment().utc().add(6, 'hours').format();
                const paramsForUpdate = generateParams(item.bearerToken);
                paramsForUpdate.AttributeUpdates = {
                    ttl: {
                        Action: 'PUT',
                        Value: newTtl
                    }
                };

                return dynamo.update(paramsForUpdate).promise()
                    .then(() => {
                        return item.employeeId;
                    })
                    .catch(() => {
                        console.log('Unable to update ttl.');
                        throw new Error('[401] Unable to update ttl.');
                    });
            })
            .then((employeeId) => {
                callback(null, generatePolicy(employeeId, 'Allow', event.methodArn));
            })
            .catch((e) => {
                callback('Unauthorized');
            });

    } else {
        callback('Unauthorized');
    }
}
