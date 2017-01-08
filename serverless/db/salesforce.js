import jsforce from 'jsforce';

import messages from './../lib/messages.js';

export default class {
    
    constructor(username, password, token, endpoint) {
        this.username = username;
        this.password = password;
        this.token = token;
        this.loggedIn = false;
        this.conn = new jsforce.Connection({
            loginUrl: endpoint
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
                    reject(new Error(messages.ERROR_SF_QUERY_FAILED));
                    return;
                }
                resolve(res);
            });
        });    
    }

} 
