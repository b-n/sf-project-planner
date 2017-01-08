export default class Resources {
    
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, context, callback }) {
        this.callback = callback;
        const { principalId, query, method, body } = event;

        this.generateConnection()
        .then(() => {
            if (method === 'GET') return this.getMethod(principalId, query);
            if (method === 'POST') return this.postMethod(body);
            return Promise.reject(new Error('Invalid method'));
        })
        .then(result => { return this.sendCallback(result) })
        .catch(result => { return this.errorCallback(result) });
    }
    
    generateConnection() {
        this.conn = new this.salesforce();

        return this.conn.login();
    }

    getMethod(employeeId, query) {
        if (!query || !query.weekstart || !query.weekend) {
            return Promise.reject(new Error('Missing parameters'));
        }
        return this.conn.query(`SELECT Id, Week_Start__c, Project__c, Project__r.Name, Hours__c
                                FROM   Resource_Hours__c 
                                WHERE  Employee__c = '${employeeId}'
                                       AND Week_Start__c <= ${query.weekEnd} 
                                       AND Week_Start__c >= ${query.weekStart}`)
        .then(res => res.records);
    }

    postMethod(body) {
        const recordsToDelete = body
            .filter(record => record.Hours__c === 0)
            .map(record => record.Id);

        const recordsToUpdate = body
            .filter(record => !!record.Id);

        const recordsToInsert = body
            .filter(record => !record.Id);

        const request = {
            delete: recordsToDelete,
            update: recordsToUpdate,
            insert: recordsToInsert
        };

        return this.conn.resourceUpdate(request);
    }

    sendCallback(result) {
        this.callback(null, result);
    }

    errorCallback(error) {
        this.callback(error);
    }
}
