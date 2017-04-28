# sf-project-planner serverless backend (for great victory)

Global deps: 
 - serverless
 - babel-cli

To install:

    yarn install

To test an endpoint from the handler (we should really be using webpack here, but oh well):

    babel-node tests/handler.js

Save yourself some time and run the linter

    yarn run lint

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

    sls decrypt -s <stage> -p <password>

Or create a file called secrets.<stage>.yml with the following:

    SF_USERNAME: '',
    SF_PASSWORD: '',
    SF_TOKEN: '',
    SF_ENDPOINT: 'https://test.salesforce.com/',
    JWT_SECRET: 'JWT secret here'

To encrypt your secrets (if you want to commit them securely):

    sls encrypt -s <stage> -p <password>

## Testing:

Test!

    yarn run test

Coverage!

    yarn run coverage

