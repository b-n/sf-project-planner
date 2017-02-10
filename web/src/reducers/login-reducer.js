import { handleActions } from 'redux-actions'

const initialState = {
  loggedIn: false,
  errorMessage: '',
  token: ''
}

const LoginReducer = handleActions({
  LOGIN_ATTEMPT: (state, action) => ({
    ...state,
    isLoading: true,
    errorMessage: ''
  }),

  LOGIN_REDIRECT: (state, action) => ({
    ...state,
    token: action.payload.token,
    loggedIn: true,
    isLoading: false,
    errorMessage: ''
  }),

  LOGIN_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload.message
  })

}, initialState)

export default LoginReducer
