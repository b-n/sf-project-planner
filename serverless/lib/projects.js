export default class Projects {

    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;

        this.generateConnection()
        .then(result => { return this.runQuery() })
        .then(result => { return this.callback(null, result) })
        .catch(result => { return this.callback(result.message) });
    }

    generateConnection() {
        this.conn = new this.salesforce();

        return this.conn.login();
    }

    runQuery() {
        return this.conn.query(`SELECT Id, Name, Account__r.Name, Description__c, Start_Date__c, End_Date__c, Budget_Hours__c, Planned_Hours__c, Status__c
                                FROM   Project__c
                                WHERE  Status__c in ('Active','On Hold','Planning') OR
                                (Status__c = 'Completed' AND End_Date__c = LAST_N_DAYS:21)`)
        .then(result => result.records);
    }
}
