import { put, takeEvery } from 'redux-saga/effects'

import * as api from '../lib/api.js'
import actionTypes from '../actions/action-types'
import actionCreators from '../actions/project'

function* fetchProjects(){
  try {
    const data = yield api.doFetchProjects()
    console.log(data)
    yield put(actionCreators.projectsFetched())
  } catch(e) {

  }
}

function* projectSaga(){
  yield takeEvery(actionTypes.FETCH_PROJECTS, fetchProjects)
}

export default projectSaga
