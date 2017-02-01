import { put, select, takeEvery } from 'redux-saga/effects'

import * as api from '../lib/api'
import selectors from '../lib/selectors'
import actionTypes from '../actions/action-types'

function* getResourceHourData(action){
  try {
    yield put({
      type: actionTypes.SET_IS_LOADING,
      payload: {
        isLoading: true
      }
    })

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
    yield put({
      type: actionTypes.SET_IS_LOADING,
      payload: {
        isLoading: false
      }
    })

    yield put({ type: actionTypes.API_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* getProjects(){
  try {
    yield put({
      type: actionTypes.SET_IS_LOADING,
      payload: {
        isLoading: true
      }
    })

    const token = yield select(selectors.token)

    const data = yield api.getProjects(token)
    yield put({
      type: actionTypes.SET_PROJECTS,
      payload: { availableProjects: data }
    })
  } catch(e) {
    yield put({
      type: actionTypes.SET_IS_LOADING,
      payload: {
        isLoading: false
      }
    })

    yield put({ type: actionTypes.API_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* saveResourceHourData() {
  try {

    const data = yield select(selectors.projectData)

    const token = yield select(selectors.token)

    yield api.saveResources(token, data)

    yield put({
      type: actionTypes.SAVE_SUCCESS
    })
  } catch(e) {
    yield put({ type: actionTypes.API_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* checkStoredData() {
  try {

    const hasResourceData = yield select(selectors.hasResourceData)
    const hasProjectData = yield select(selectors.hasProjectData)

    if (hasResourceData && hasProjectData) {
      yield put({
        type: actionTypes.SET_IS_LOADING,
        payload: {
          isLoading: false
        }
      })
    }

  } catch(e) {
    yield put({ type: actionTypes.API_ERROR, payload: {
        message: e.message
      }
    })
  }
}

function* projectSaga(){
  yield [
    takeEvery(actionTypes.GET_RESOURCES, getResourceHourData),
    takeEvery(actionTypes.UPDATE_WEEKS, getResourceHourData),
    takeEvery(actionTypes.FETCH_PROJECTS, getProjects),
    takeEvery(actionTypes.SAVE_TO_SERVER, saveResourceHourData),

    takeEvery(actionTypes.SET_RESOURCES, checkStoredData),
    takeEvery(actionTypes.SET_PROJECTS, checkStoredData)
  ]
}

export default projectSaga
