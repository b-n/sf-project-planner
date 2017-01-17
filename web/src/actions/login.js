import actionTypes from './action-types'

export const loginAttempt = (username, password) => {
  return {
    type: actionTypes.LOGIN_ATTEMPT,
    payload: {
      username,
      password
    }
  }
}

export const loginRedirect = (token) => {
  return {
    type: actionTypes.LOGIN_REDIRECT,
    payload: {
      token
    }
  }
}

export const loginError = (error) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: {
      error
    }
  }
}
