import { _login } from '../handler.js';
import dotenv from 'dotenv';
dotenv.config();

(() => {
    const event = {
        body: { 
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    }

    _login(event, {} , (error, success) => {
        console.log('error', error);
        console.log('success', success);
    });
})();
