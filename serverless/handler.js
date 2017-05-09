import salesforce from './db/salesforce'

import Login from './lib/login'
import ForgotPassword from './lib/forgotPassword'
import ChangePassword from './lib/changePassword'
import Projects from './lib/projects'
import Resources from './lib/resources'
import { authorizer } from './lib/authorizer'


export function _authorizer(event, context, callback) {
    authorizer({ event, context, callback })
}

export function _login(event, context, callback) {
    const handler = new Login({ salesforce })
    handler.run({ event, context, callback })
}

export function _forgotPassword(event, context, callback) {
    const handler = new ForgotPassword({ salesforce })
    handler.run({ event, context, callback })
}

export function _changePassword(event, context, callback) {
    const handler = new ChangePassword({ salesforce })
    handler.run({ event, context, callback })
}

export function _resources(event, context, callback) {
    const handler = new Resources({ salesforce })
    handler.run({ event, context, callback })
}

export function _projects(event, context, callback) {
    const handler = new Projects({ salesforce })
    handler.run({ event, context, callback })
}
