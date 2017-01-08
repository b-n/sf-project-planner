import { LOGIN_ATTEMPT } from './action-types'

export function loginAttempt(username, password) {
  return {
    type: LOGIN_ATTEMPT,
    payload: true
  }
}
