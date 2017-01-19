import { put, select, takeEvery } from 'redux-saga/effects'

import * as api from '../lib/api'
import selectors from '../lib/selectors'
import actionTypes from '../actions/action-types'

function* getProjectData(action){
  try {
    const projects = yield select(selectors.projects)
    const { weekFrom, weekTo } = projects
    const dateRange = {
      weekstart: weekFrom.format('YYYY-MM-DD'),
      weekend: weekTo.format('YYYY-MM-DD')
    }

    const token = yield select(selectors.token)

    const data = yield api.getResources(token, dateRange)

    yield put({
      type: actionTypes.SET_RESOURCES,
      payload: {
        projectData: data
      }
    })
  } catch(e){
    yield put({ type: actionTypes.API_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* fetchProjects(){
  try {
    const data = yield api.doFetchProjects()
<<<<<<< HEAD
    console.log('testing')
    yield put(actionCreators.projectsFetched())
=======
    console.log(data)
    //yield put(actionCreators.projectsFetched())
>>>>>>> ce8f2dc2f8b1ef3f21b36a94cab4228db17b9920
  } catch(e) {

  }
}

function* projectSaga(){
  yield [
    takeEvery(actionTypes.GET_RESOURCES, getProjectData),
    takeEvery(actionTypes.FETCH_PROJECTS, fetchProjects)
  ]
}

export default projectSaga
