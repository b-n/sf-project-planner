import hasha from 'hasha'
import jwt from 'jsonwebtoken'

import messages from './messages'

export default class Login {
    constructor({ salesforce }) {
        this.Salesforce = salesforce
    }

    login({ event, callback }) {
        this.callback = callback

        this.validate(event, ['username', 'password'])
            .then(() => { return this.generateConnection() })
            .then(() => { return this.runQuery() })
            .then((result) => { return this.parseRecord(result) })
            .then((result) => { return this.generateToken(result) })
            .then((result) => { return this.callback(null, result) })
            .catch((result) => { return this.callback(result.message) })
    }

    changePassword({ event, callback }) {
        this.callback = callback

        this.validate(event, ['username', 'password', 'oldPassword'])
            .then((result) => { return this.callback(null, result) })
            .catch((result) => { return this.callback(result.message) })
        // validate event body { userId, oldPassword, newPassword }
        //   check current username and password
        //   generate new salt, and hash from newpassword
        //   call salesforce to store new hash and newpassword

        // if (!event || !event.body || !event.body.password || !event.body.oldPassword) return Promise.reject(new Error(messages.ERROR_REQUIRE_PASSWORDS))
    }

    validate(event, requiredFields) {
        if (!event || !event.body) {
            return Promise.reject(new Error(messages.ERROR_REQUIRE_BODY))
        }

        const nonExistantKeys = Object.keys(event.body).filter((key) => requiredFields.indexOf(key) == -1 || !event.body[key])
        if (nonExistantKeys.length != 0) {
            const missingKeysString = nonExistantKeys.join(', ')
            return Promise.reject(new Error(messages.ERROR_REQUIRE_BODY_KEYS + missingKeysString))
        }

        const params = requiredFields.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue]: event.body[currentValue] }), {})
        return Promise.resolve(params)
    }

    generateConnection() {
        this.conn = new this.Salesforce()

        return this.conn.login()
    }

    runQuery() {
        return this.conn.query(`SELECT Id, Username__c, Password__c, Salt__c
                                FROM   Employee__c where Username__c = '${this.username}'`)
    }

    parseRecord(res) {
        const record = res.records[0]
        if (!record || !Login.checkPassword(this.password, record.Salt__c, record.Password__c)) {
            return Promise.reject(new Error(messages.ERROR_WRONG_LOGIN))
        }

        return Promise.resolve(record.Id)
    }

    generateToken(record) {
        const token = jwt.sign(
            { employeeId: record },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h',
            }
        )

        return Promise.resolve({ token })
    }

    static checkPassword(password, salt, storedPassword) {
        const hashedPassword = hasha(password + salt, { encoding: 'base64' })
        return (hashedPassword === storedPassword)
    }
}
