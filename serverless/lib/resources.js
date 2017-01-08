import env from './env.js';

export function resources({ event, context, callback }, { salesforce }) {

    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;
    const conn = new salesforce(SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT);
    const { employeeId, query, method } = event;

    const get = function() {
        return conn.login()
            .then(() => {
                return conn.query(`SELECT Id, Week_Start__c, Project__c, Project__r.Name, Hours__c
                                   FROM   Resource_Hours__c 
                                   WHERE  Employee__c = '${employeeId}'
                                          AND Week_Start__c <= ${query.weekEnd} 
                                          AND Week_Start__c >= ${query.weekStart}`);
            })
            .then(res => {
                return res.records;
            })
            .then(response => {
                callback(null, response);
            })
            .catch(err => {
                callback(err);
            });
    };

    const post = function() {
        const recordsToDelete = event.body
            .filter(record => record.Hours__c === 0)
            .map(record => record.Id);

        const recordsToUpsert = event.body
            .filter(record => record.Hours__c > 0);

        return conn.login()
            .then(() => {
                return Promise.all([
                    conn.del('Resource_Hours__c', recordsToDelete),
                    conn.upsert('Resource_Hours__c', 'Id', recordsToUpsert)
                ]);
            })
            .catch(err => {
                callback(err);
            });
    };

    if (method === 'GET') get();
    if (method === 'POST') post();
}
