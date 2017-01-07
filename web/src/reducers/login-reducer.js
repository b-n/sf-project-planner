import { LOGIN_ATTEMPT } from '../actions/action-types'

const initialState = {
  isLoggedIn = false
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        isLoggedIn: action.payload
      }
    default:
      return state
  }
}

export default LoginReducer
