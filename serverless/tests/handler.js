import { _projects } from '../handler.js';
import { _login, _authorizer, _projects } from '../handler.js';
import dotenv from 'dotenv';
dotenv.config();

// (() => {
//     const event = {
//         body: {
//             username: process.env.USERNAME,
//             password: process.env.PASSWORD
//         }
//     }
//
//     _login(event, {} , (error, success) => {
//         console.log('error', error);
//         console.log('success', success);
//     });
// })();


(() => {
    const event = {
        type: 'TOKEN',
        authorizationToken: 'Bearer token',
        methodArn: 'arn:aws:execute-api:us-east-1:411615132843:zo5571jwvj/dev/GET/resources'
    };

    /*_projects(event, {} , (error, success) => {
        console.log('error', error);
        console.log('success', success);
    )};*/
    _authorizer(event, {} , (error, success) => {
        if (error) console.log('error', error);
        if (success) console.log('success', success);
    });
})();
