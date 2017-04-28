import messages from './messages';

export default class ForgotPassword {
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;

        this.validate(event)
            .then(() => { return this.generateConnection() })
            .then(() => { return this.sendForgotPassword() })
            .then(result => { this.callback(null, result) })
            .catch(result => { this.callback(result.message) });
    }

    validate(event) {
        if (!event || !event.body || !event.body.username) return Promise.reject(new Error(messages.ERROR_NO_USERNAME));

        this.username = event.body.username;
        return Promise.resolve();
    }

    generateConnection() {
        this.conn = new this.salesforce();

        return this.conn.login();
    }

    sendForgotPassword() {
        return this.conn.forgotPassword(this.username);
    }
}
