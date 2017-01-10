import actionTypes from '../actions/action-types'

const initialState = {
  loggedIn: false,
  shouldRedirect: false,
  displayError: false,
  displaySpinner: false
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        loggedIn: action.payload.displaySpinner
      })
    case actionTypes.LOGIN_REDIRECT:
      return Object.assign({}, state, {
        loggedIn: action.payload.loggedIn,
        shouldRedirect: action.payload.shouldRedirect
      })
    case actionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        displayError: action.payload.displayError,
        displaySpinner: action.payload.displaySpinner
      })
    default:
      return state
  }
}



export default LoginReducer
