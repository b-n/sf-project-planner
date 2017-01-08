export default class Projects {
    
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;
        
        this.generateConnection()
        .then(result => { return this.runQuery() })
        .then(result => { return this.parseQueryResult(result) })
        .then(result => { return this.sendCallback(result) })
        .catch(result => { return this.errorCallback(result) });
    }
    
    generateConnection() {
        this.conn = new this.salesforce();

        return this.conn.login();
    }
    
    runQuery() {
        return this.conn.query(`SELECT Id, Account__r.Name, Description__c, Start_Date__c, End_Date__c, Budget_Hours__c, Planned_Hours__c, Status__c
                                FROM   Project__c 
                                WHERE  Status__c in ('Active','On Hold','Planning') OR
                                (Status__c = 'Completed' AND End_Date__c = LAST_N_DAYS:21)`); 
                 
    }
    
    parseQueryResult(result) {
        if (!result || !result.records) {
            return Promise.resolve([]);
        }
        return Promise.resolve(result.records);
    }
    
    sendCallback(message) {
        this.callback(null, message);
    }

    errorCallback(message) {
        this.callback(message);
    }
}
