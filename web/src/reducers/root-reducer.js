import { combineReducers } from 'redux'
import ReactRedux from 'react-redux'

import projectReducer from './project-reducer'

const RootReducer = combineReducers(projectReducer)

export default RootReducer
