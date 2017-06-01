import hasha from 'hasha'
import cryptoRandomString from 'crypto-random-string'
import jwt from 'jsonwebtoken'

import messages from './messages'

export default class Login {
    constructor({ salesforce }) {
        this.Salesforce = salesforce
    }

    async login({ event, callback }) {
        try {
            const params = this.validate(event, ['username', 'password'])

            const conn = await this.generateConnection()
            const queryResult = await this.runQuery(conn, { 'Username__c': params.username })

            const validPassword = this.checkPassword(params.password, queryResult.Salt__c, queryResult.Password__c)
            if (!validPassword) throw new Error(messages.ERROR_WRONG_LOGIN)

            const token = this.generateToken(queryResult.Id)

            callback(null, token)
        } catch (e) {
            callback(e.message)
        }
    }

    async changePassword({ event, callback }) {
        try {
            const params = this.validate(event, ['username', 'password', 'oldPassword'])

            const conn = await this.generateConnection()
            const queryResult = await this.runQuery(conn, { 'Username__c': params.username })

            const validPassword = this.checkPassword(params.oldPassword, queryResult.Salt__c, queryResult.Password__c)
            if (!validPassword) throw new Error(messages.ERROR_WRONG_LOGIN)

            const { salt, hash } = this.generateSaltAndHash(params.password)
            const sfResult = await conn.changePassword(params.username, hash, salt)

            callback(null, sfResult)
        } catch (e) {
            callback(e.message)
        }
    }

    validate(event, requiredFields) {
        if (!event || !event.body) {
            throw new Error(messages.ERROR_REQUIRE_BODY)
        }

        const nonExistantKeys = requiredFields.filter((key) =>!event.body[key])
        if (nonExistantKeys.length != 0) {
            const missingKeysString = nonExistantKeys.join(', ')
            throw new Error(messages.ERROR_MISSING_BODY_KEYS + missingKeysString)
        }

        return requiredFields.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue]: event.body[currentValue] }), {})
    }

    async generateConnection() {
        const conn = new this.Salesforce()
        await conn.login()
        return conn
    }

    async runQuery(conn, filters) {
        try {
            const filterStrings = Object.keys(filters).map((key) => key + ' = \'' + filters[key] + '\'')
            const whereClause = filterStrings.join(' AND ')
            const queryResult = await conn.query(`SELECT Id, Username__c, Password__c, Salt__c FROM Employee__c where ${whereClause}`)
            if (!queryResult.records || !queryResult.records[0]) throw new Error(messages.ERROR_QUERY_NO_RECORDS)
            return queryResult.records[0]
        } catch (e) {
            return Promise.reject(new Error(messages.ERROR_SF_QUERY_FAILED))
        }
    }

    generateToken(employeeId) {
        const token = jwt.sign(
            { employeeId },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h',
            }
        )

        return { token }
    }

    checkPassword(password, salt, storedPassword) {
        const hashedPassword = hasha(password + salt, { encoding: 'base64' })
        return (hashedPassword === storedPassword)
    }

    generateSaltAndHash(password) {
        const salt = hasha(cryptoRandomString(32), { encoding: 'base64' })
        const hash = hasha(password + salt, { encoding: 'base64' })
        return { salt, hash }
    }
}
