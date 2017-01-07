import env from './env.js';

export function projects({ event, context, callback }, { salesforce }) {

    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = env;

    const conn = new salesforce(SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT);
   
    conn.login()
    .then(() => {
        return conn.query('SELECT Id, Account__r.Name, Description__c, Start_Date__c, End_Date__c, Budget_Hours__c, Planned_Hours__c, Status__c ' +
                          'FROM   Project__c ' + 
                          'WHERE  Status__c in (\'Active\',\'On Hold\',\'Planning\') OR ' +
                          '       (Status__c = \'Completed\' AND End_Date__c = LAST_N_DAYS:21)'); 
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
}
