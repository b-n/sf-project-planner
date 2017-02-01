import { combineReducers } from 'redux'

import projectReducer from './project-reducer'
import loginReducer from './login-reducer'
import globalReducer from './global-reducer'

const rootReducer = combineReducers(
  {
    projects: projectReducer,
    login: loginReducer,
    global: globalReducer
  }
)

export default rootReducer
