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
        displaySpinner: true,
        displayError: false
      })
    case actionTypes.LOGIN_REDIRECT:
      const { token } = action.payload
      return Object.assign({}, state, {
        token,
        loggedIn: true,
        displaySpinner: false,
        displayError: false
      })
    case actionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        displayError: true,
        displaySpinner: false
      })
    default:
      return state
  }
}



export default LoginReducer
