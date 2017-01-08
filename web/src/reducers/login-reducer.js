import { LOGIN_ATTEMPT } from '../actions/action-types'

const initialState = false

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return action.payload
    default:
      return state
  }
}

export default LoginReducer
