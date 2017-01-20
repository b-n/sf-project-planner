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

function* getProjects(){
  try {

    const token = yield select(selectors.token)

    const data = yield api.getProjects(token)
    yield put({
      type: actionTypes.SET_PROJECTS,
      payload: { availableProjects: data }
    })
  } catch(e) {
    console.log(e.message);
  }
}

function* projectSaga(){
  yield [
    takeEvery(actionTypes.GET_RESOURCES, getProjectData),
    takeEvery(actionTypes.FETCH_PROJECTS, getProjects)
  ]
}

export default projectSaga
