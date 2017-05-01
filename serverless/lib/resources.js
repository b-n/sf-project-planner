import messages from './messages'

export default class Resources {

    constructor({ salesforce }) {
        this.Salesforce = salesforce
    }

    run({ event, context, callback }) {
        this.callback = callback
        this.event = event

        this.validate()
            .then(() => { return this.generateConnection() })
            .then(() => {
                if (this.method === 'GET') return this.getMethod()
                if (this.method === 'POST') return this.postMethod()
            })
            .then((result) => { return this.callback(null, result) })
            .catch((result) => { return this.callback(result.message) })
    }

    validate() {
        const validMethods = ['GET', 'POST']
        const { principalId, query, method, body } = this.event

        if (!principalId) return Promise.reject(new Error(messages.ERROR_REQUIRE_PRINCIPALID))

        if (!method || !validMethods.some((vMethod) => vMethod === method))
            return Promise.reject(new Error(messages.ERROR_INVALID_METHOD))

        if (method === 'GET' &&
            (!query || !query.weekstart || !query.weekend))
            return Promise.reject(new Error(messages.ERROR_REQUIRE_QUERY_PARAMS))

        if (method ==='POST' &&
            (!body))
            return Promise.reject(new Error(messages.ERROR_REQUIRE_BODY))

        this.principalId = principalId
        this.method = method
        this.query = query
        this.body = body

        return Promise.resolve()
    }

    generateConnection() {
        this.conn = new this.Salesforce()

        return this.conn.login()
    }

    getMethod() {
        const { weekstart, weekend } = this.query
        const employeeId = this.principalId
        return this.conn.query(`SELECT Id, Week_Start__c, Project__c, Project__r.Name, Project__r.Id, Project__r.Status__c, Hours__c
                                FROM   Resource_Hours__c
                                WHERE  Employee__c = '${employeeId}'
                                       AND Week_Start__c <= ${weekend}
                                       AND Week_Start__c >= ${weekstart}`)
            .then((res) => res.records)
    }

    postMethod() {
        const body = this.body
        const employeeId = this.principalId

        const records = body.map((record) => { return { ...record, Employee__c: employeeId } } )

        const recordsToDelete = records
            .filter((record) => record.Id && record.Hours__c === 0)
            .map((record) => { return Object.assign({ Id: '' }, record) })

        const recordsToUpdate = records
            .filter((record) => record.Id && record.Hours__c !== 0)
            .map((record) => { return Object.assign({ Id: '', Employee__c: employeeId, Hours__c: 0, Project__c: '', Week_Start__c: '' }, record) })


        const recordsToInsert = records
            .filter((record) => !record.Id && record.Hours__c !== 0)
            .map((record) => { return Object.assign({ Employee__c: employeeId, Hours__c: 0, Project__c: '', Week_Start__c: '' }, record) })

        const request = {
            recordsToDelete,
            recordsToUpdate,
            recordsToInsert,
        }

        return this.conn.resourceUpdate(request)
    }
}
