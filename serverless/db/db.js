import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const offlineOptions = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
};

const offline = (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'dev');

export default (offline
                ? new AWS.DynamoDB.DocumentClient(offlineOptions)
                : new AWS.DynamoDB.DocumentClient());
