import { createStore, applyMiddleware } from 'redux'
import 'babel-polyfill'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/root-reducer'
import rootSaga from './sagas/root-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger()))

sagaMiddleware.run(rootSaga)

export default store
