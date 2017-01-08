import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import rootReducer from './reducers/root-reducer'

const store = createStore(rootReducer, applyMiddleware(thunk, logger(), promise()))

export default store
