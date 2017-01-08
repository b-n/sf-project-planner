import actionTypes from '../actions/action-types'

const initialState = {
  loggedIn: false
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ATTEMPT:
      return {
        loggedIn: action.payload
      }
    default:
      return state
  }
}

export default LoginReducer
