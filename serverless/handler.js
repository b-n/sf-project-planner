import { _login, _authorizer, _projects, _resources } from '../handler.js';

(() => {
    const event = {
        type: 'TOKEN',
        authorizationToken: 'Bearer token',
        methodArn: 'arn:aws:execute-api:us-east-1:411615132843:zo5571jwvj/dev/GET/resources',
        employeeId: 'a0025000005IXKsAAO',
        query: {
            weekEnd: '2017-01-30',
            weekStart: '2016-11-01'
        },
        method: 'GET',
        body: [
            {
                Id: 'a0X25000001vlanEAA',
                Week_Start__c: '2016-12-26',
                Project__c: 'a0925000005zra0AAA',
                Hours__c: 21
            },
            {
                Id: 'a0X25000001vlaoEAA',
                Week_Start__c: '2017-01-02',
                Project__c: 'a0925000005zra0AAA',
                Hours__c: 0
            },
            {
                Id: '',
                Week_Start__c: '2017-01-09',
                Project__c: 'a0925000005zra0AAA',
                Hours__c: 32
            }
        ]
    };

    _authorizer(event, {} , (error, success) => {
        if (error) console.log('error', error);
        if (success) console.log('success', success);
    });
})();
