import messages from './messages'

export default class ChangePassword {

    constructor({ salesforce }) {
        this.Salesforce = salesforce
    }

    run({ event, callback }) {
        this.validate(event)
            .then((result) => { callback(null, result) })
            .catch((err) => { callback(err.message) })
    }

    validate(event) {
        if (!event || !event.body || !event.body.password || !event.body.oldPassword) return Promise.reject(new Error(messages.ERROR_REQUIRE_PASSWORDS))

        this.password = event.body.password
        this.oldPassword = event.body.oldPassword

        return Promise.resolve()
    }

}
