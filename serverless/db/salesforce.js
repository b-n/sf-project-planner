import jsforce from 'jsforce';

import messages from './../lib/messages.js';

export default class {

    constructor() {
        const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_ENDPOINT } = process.env;

        this.username = SF_USERNAME;
        this.password = SF_PASSWORD;
        this.token = SF_TOKEN;
        this.loggedIn = false;
        this.conn = new jsforce.Connection({
            loginUrl: SF_ENDPOINT
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            this.conn.login(this.username, this.password + this.token, (err, res) => {
                if (err) {
                    reject(new Error(messages.ERROR_SF_AUTH));
                    return;
                }
                this.loggedIn = true;
                resolve(res);
            });
        });
    }

    query(queryString) {
        return new Promise((resolve, reject) => {
            if (!this.loggedIn) {
                reject(new Error(messages.ERROR_SF_AUTH));
                return;
            }

            this.conn.query(queryString, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(new Error(messages.ERROR_SF_QUERY_FAILED));
                    return;
                }
                resolve(res);
            });
        });
    }

    resourceUpdate(resources) {
        return new Promise((resolve, reject) => {
            if (!this.loggedIn) {
                reject(new Error(messages.ERROR_SF_AUTH));
                return;
            }

            this.conn.apex.post('/ResourceHours/', resources, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Failed to call rest resource'));
                    return;
                }
                resolve(res);
            });
        });
    }
}
