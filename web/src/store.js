import { createStore, applyMiddleware } from 'redux'
import 'babel-polyfill'

import logger from 'redux-logger'
import sagaMiddleware from 'redux-saga'

import rootReducer from './reducers/root-reducer'

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger()))

export default store
