import { createStore, applyMiddleware, compose } from 'redux'
import 'babel-polyfill'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/root-reducer'
import rootSaga from './sagas/root-saga'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger())))

sagaMiddleware.run(rootSaga)

export default store
