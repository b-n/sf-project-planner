import salesforce from './db/salesforce.js';

import Login from './lib/login.js';
import ForgotPassword from './lib/forgotPassword';
import Projects from './lib/projects.js';
import Resources from './lib/resources.js';
import { authorizer } from './lib/authorizer.js';


export function _authorizer(event, context, callback) {
    authorizer({ event, context, callback });
}

export function _login(event, context, callback) {
    const handler = new Login({ salesforce });
    handler.run({ event, context, callback });
}

export function _forgotPassword(event, context, callback) {
    const handler = new ForgotPassword({ salesforce });
    handler.run({event, context, callback });
}

export function _resources(event, context, callback) {
    const handler = new Resources({ salesforce });
    handler.run({ event, context, callback });
}

export function _projects(event, context, callback) {
    const handler = new Projects({ salesforce });
    handler.run({ event, context, callback });
}
