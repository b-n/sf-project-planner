import actionTypes from '../actions/action-types'

const initialState = {
  loggedIn: false,
  displayError: false,
  displaySpinner: false,
  token: ''
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        displaySpinner: action.payload.displaySpinner,
        displayError: action.payload.displayError
      })
    case actionTypes.LOGIN_REDIRECT:
      return Object.assign({}, state, {
        loggedIn: action.payload.loggedIn,
        displaySpinner: action.payload.displaySpinner
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
