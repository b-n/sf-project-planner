export default class ForgotPassword {
    constructor({ salesforce }) {
        this.salesforce = salesforce;
    }

    run({ event, callback }) {
        this.callback = callback;
    }
}
