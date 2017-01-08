import { combineReducers } from 'redux'

import projectReducer from './project-reducer'
import loginReducer from './login-reducer'

const rootReducer = combineReducers(
  {
    projects: projectReducer,
    login: loginReducer
  }
)

export default rootReducer
