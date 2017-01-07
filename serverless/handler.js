import dynamo from './db/dynamo.js';
import salesforce from './db/salesforce.js';

import { login } from './lib/login.js';
import { projects } from './lib/login.js';
import { resources } from './lib/login.js';
import { authorizer } from './lib/authorizer.js';


export function _authorizer(event, context, callback) {
    authorizer({ event, context, callback }, { dynamo });
}

export function _login(event, context, callback) {
    login({ event, context, callback }, { dynamo, salesforce });
}

export function _resources(event, context, callback) {
    resources({ event, context, callback }, {});
}

export function _projects(event, context, callback) {
    projects({ event, context, callback }, {});
}
