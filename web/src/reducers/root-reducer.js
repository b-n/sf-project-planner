import { combineReducers } from 'redux'

import projectReducer from './project-reducer'

const rootReducer = combineReducers({projects: projectReducer})

export default rootReducer
