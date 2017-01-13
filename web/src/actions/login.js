import actionTypes from './action-types'

export const loginAttempt = () => {
  return {
    type: actionTypes.ADD_PROJECT,
    payload: {

    }
  }
}

export const loginSucceded = () => {
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
    type: actionTypes.Types.LOGIN_ERROR,
    payload: {
      displayError: true,
      displaySpinner: false
    }
  }
}
