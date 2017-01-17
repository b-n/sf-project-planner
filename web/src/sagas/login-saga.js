import { call, put, takeEvery } from 'redux-saga/effects'

import endpoints from '../endpoints'
import actionTypes from '../actions/action-types'
import * as actionCreators from '../actions/login'

function* attemptLogin(){
  try {
    const data = yield call(fetch, endpoints.login, {
      method: 'POST', body: { username: 'nayben@gmail.com', password: 'derp' }
    })
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
