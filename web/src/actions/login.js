import actionTypes from './action-types'

export const loginAttempt = () => {
  return {
    type: actionTypes.LOGIN_ATTEMPT,
    payload: {
      displayError: false,
      displaySpinner: true
    }
  }
}

export const loginRedirect = () => {
  return {
    type: actionTypes.LOGIN_REDIRECT,
    payload: {
      loggedIn: true,
      displaySpinner: false
    }
  }
}

export const loginError = () => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: {
      displayError: true,
      displaySpinner: false
    }
  }
}
