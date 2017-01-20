import { put, takeEvery } from 'redux-saga/effects'

import * as api from '../lib/api.js'
import actionTypes from '../actions/action-types'

function* attemptLogin(action){
  try {
    const { username, password } = action.payload

    const data = yield api.postLogin(username, password)

    yield put({ type: actionTypes.LOGIN_REDIRECT, payload: {
        token: data.bearerToken
      }
    })
  } catch(e){
    yield put({ type: actionTypes.LOGIN_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* loginSaga(){
  yield takeEvery(actionTypes.LOGIN_ATTEMPT, attemptLogin)
}

export default loginSaga
