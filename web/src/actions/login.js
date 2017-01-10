import actionTypes from './action-types'

const loginAttempt = () => {
  return {
    type: actionTypes.LOGIN_ATTEMPT,
    payload: {
      displaySpinner: true
    }
  }
}

const loginSucceded = () => {
  return {
    type: actionTypes.LOGIN_REDIRECT,
    payload: {
      loggedIn: true,
      shouldRedirect: true,
      displaySpinner: false
    }
  }
}

const loginError = () => {
  type: action.Types.LOGIN_ERROR,
  payload: {
    displayError: true,
    displaySpinner: false
  }
}
