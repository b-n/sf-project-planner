import dotenv from 'dotenv';

import * as auth from '../auth.js';

(() =>{
    const event = {
        body: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    };
    
    const cb = (err, res) => {
        console.log(err, res);
    };

    auth.login(event, {}, cb);
})();
