import actionTypes from './action-types'


const loginAttempt = () => {
  return {
    type: actionTypes.LOGIN_ATTEMPT,
    payload: {
      loggedIn: false,
      shouldRedirect: false,
      displayError: true,
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
      displayError: false,
      displaySpinner: false
    }
  }
}

const loginError = () => {
  type: action.Types.LOGIN_ERROR,
  payload: {
    loggedIn: false,
    shouldRedirect: false,
    displayError: true,
    displaySpinner: false
  }
}
