import { call, put, takeEvery } from 'redux-saga/effects'

import actionTypes from '../actions/action-types'
import * as actionCreators from '../actions/login'

function* attemptLogin(){
  try {
    const data = yield call(fetch, '/#/projects', { method: 'GET', body: {} })
    console.log(data)
    yield put(actionCreators.loginRedirect())
  } catch(e){
    yield put(actionCreators.loginError())
  }
}

function* loginSaga(){
  yield takeEvery(actionTypes.LOGIN_ATTEMPT, attemptLogin)
}

export default loginSaga
