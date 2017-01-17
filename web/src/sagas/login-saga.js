import { put, takeEvery } from 'redux-saga/effects'

import endpoints from '../endpoints'
import actionTypes from '../actions/action-types'

function* attemptLogin(action){
  try {
    const { username, password } = action.payload
    
    const body = JSON.stringify({
        username,
        password
    })

    const data = yield fetch(endpoints.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then(response => response.json())

    if (!data.bearerToken) throw new Error('no token in response');
    yield put({ type: actionTypes.LOGIN_REDIRECT, payload: { token: data.bearerToken }})
  } catch(e){
    yield put({ type: actionTypes.LOGIN_ERROR })
  }
}

function* loginSaga(){
  yield takeEvery(actionTypes.LOGIN_ATTEMPT, attemptLogin)
}

export default loginSaga
