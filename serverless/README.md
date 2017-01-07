# sf-project-planner serverless backend (for great victory)

To test locally, you need Java for serverless local dynamo

Global deps:
    
    npm install -g serverless
    npm install -g babel-cli

To install:

    npm install
    sls dynamodb install

To run localdb

    sls dynamodb start

To test an endpoint from the handler:

    babel-node tests/handler.js


## Environment variables:

For dev in project root, you need `.env` with the following:

    ENVIRONMENT=dev
    USERNAME=usernameForAuthorizer
    PASSWORD=passwordForAuthorizer

For deploying and salesforce connection under `./lib/env.js` you need the following:

    export default {
        SF_USERNAME: '',
        SF_PASSWORD: '',
        SF_TOKEN: '',
        SF_ENDPOINT: 'https://test.salesforce.com/'
    }
