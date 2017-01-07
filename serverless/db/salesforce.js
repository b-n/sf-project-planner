import jsforce from 'jsforce';


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
                    reject(err);
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
                reject('Not logged in');
                return;
            }

            this.conn.query(queryString, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });    
    }

} 
