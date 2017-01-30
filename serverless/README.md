# sf-project-planner serverless backend (for great victory)

To test locally, you need Java for serverless local dynamo

Global deps:
    
    npm install -g serverless
    npm install -g babel-cli

To install:

    npm install

To test an endpoint from the handler:

    babel-node tests/handler.js

## Environment variables:

### Development and testing

For dev in project root, you need `.env` with the following:

    SF_USERNAME: '',
    SF_PASSWORD: '',
    SF_TOKEN: '',
    SF_ENDPOINT: 'https://test.salesforce.com/',
    JWT_SECRET: 'JWT secret here'

### Deploying to AWS

A couple of options here, you can decrypt the encrypted values by:

    sls decrypt --stage <stage> --password <password>

Or create a file called secrets.<stage>.yml with the following:

    SF_USERNAME: '',
    SF_PASSWORD: '',
    SF_TOKEN: '',
    SF_ENDPOINT: 'https://test.salesforce.com/',
    JWT_SECRET: 'JWT secret here'

To encrypt your secrets (if you want to commit them securely):

    sls encrypt --stage <stage> --password <password>

## Testing:

Test!

    npm run test

Coverage!

    npm run coverage

