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
        loggedIn: true
      })
    case actionTypes.LOGIN_REDIRECT:
      return Object.assign({}, state, {
        shouldRedirect: true
      })
    default:
      return state
  }
}

export default LoginReducer
