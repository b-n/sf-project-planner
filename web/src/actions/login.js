import actionTypes from './action-types'

export function loginAttempt(username, password) {
  return {
    type: actionTypes.LOGIN_ATTEMPT,
    payload: true
  }
}
