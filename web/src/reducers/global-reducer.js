import { handleActions } from 'redux-actions'

const initialState = {
  isLoading: false
}

const LoginReducer = handleActions({
  LOGIN_ATTEMPT: (state, action) => ({
    ...state,
    isLoading: true
  }),

  GET_PROJECT_PAGE_DATA: (state, action) => ({
    ...state,
    isLoading: true
  }),

  GET_RESOURCES: (state, action) => ({
    ...state,
    isLoading: true
  }),

  SAVE_TO_SERVER: (state, action) => ({
    ...state,
    isLoading: true
  }),

  SAVE_SUCCESS: (state, action) => ({
    ...state,
    isLoading: false
  }),

  SAVE_ERROR: (state, action) => ({
    ...state,
    isLoading: false
  }),

  LOGIN_REDIRECT: (state, action) => ({
    ...state,
    isLoading: false
  }),

  LOGIN_ERROR: (state, action) => ({
    ...state,
    isLoading: false
  }),

  API_ERROR: (state, action) => ({
    ...state,
    isloading: false
  }),

  SET_IS_LOADING: (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading
  })

}, initialState)

export default LoginReducer
