import { createAction } from 'redux-actions'
import actionTypes from './action-types'

export const loginAttempt = createAction(actionTypes.LOGIN_ATTEMPT, (username, password) => ({ username, password }))
export const loginRedirect = createAction(actionTypes.LOGIN_REDIRECT, token => ({ token }))
export const loginError = createAction(actionTypes.LOGIN_ERROR, error => ({ error }))
