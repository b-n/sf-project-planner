import { call, put, select, takeEvery } from 'redux-saga/effects'

import * as api from '../lib/api'
import selectors from '../lib/selectors'
import actionTypes from '../actions/action-types'
import { UnauthorizedError } from '../lib/exceptions'

function* showAPIErrorToast(e) {
  yield put({
    type: actionTypes.SHOW_TOAST,
    payload: {
      message: 'Error when processing your request. Error message: ' + e.message,
      type: 'error'
    }
  })

  //shouldn't need the check on e.message however custom authorizers don't return valid cors responses if not validated
  if (e instanceof UnauthorizedError || e.message === 'Failed to fetch') {
    yield put({
      type: actionTypes.API_UNAUTHORIZED,
      payload: {}
    })
  }
}

function* getProjectPageData(action) {
  yield [
    call(getResourceHourData),
    call(getProjects)
  ]

  yield put({
    type: actionTypes.SET_IS_LOADING,
    payload: {
      isLoading: false
    }
  })
}

function* getOnlyResourceHourData(action) {
  yield getResourceHourData()

  yield put({
    type: actionTypes.SET_IS_LOADING,
    payload: {
      isLoading: false
    }
  })
}

function* getResourceHourData(action){
  try {
    const projects = yield select(selectors.projects)
    const { weekFrom, weekTo } = projects
    const dateRange = {
      weekstart: weekFrom.format('YYYY-MM-DD'),
      weekend: weekTo.format('YYYY-MM-DD')
    }

    const token = yield select(selectors.token)

    const data = yield api.getResources(token, dateRange)

    const projectData = selectors.resourceDataFromAPI(data)

    yield put({
      type: actionTypes.SET_RESOURCES,
      payload: { projectData }
    })
  } catch(e){
    yield showAPIErrorToast(e)
  }
}

function* getProjects(){
  try {
    const token = yield select(selectors.token)

    const data = yield api.getProjects(token)

    const availableProjects = selectors.projectDataFromAPI(data)
    yield put({
      type: actionTypes.SET_PROJECTS,
      payload: { availableProjects }
    })
  } catch(e) {
    yield showAPIErrorToast(e)
  }
}

function* saveResourceHourData() {
  try {

    const data = yield select(selectors.projectData)

    const apiData = selectors.resourceDataToAPI(data)

    const token = yield select(selectors.token)

    yield api.saveResources(token, apiData)

    yield getResourceHourData()

    yield put({
      type: actionTypes.SAVE_SUCCESS
    })

    yield put({ type: actionTypes.SHOW_TOAST, payload: {
        message: 'Resources saved successfully',
        type: 'success'
      }
    })

  } catch(e) {
    yield showAPIErrorToast(e)
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
    yield showAPIErrorToast(e)
  }
}

function* projectSaga(){
  yield [
    takeEvery(actionTypes.GET_RESOURCES, getOnlyResourceHourData),
    takeEvery(actionTypes.GET_PROJECT_PAGE_DATA, getProjectPageData),
    takeEvery(actionTypes.UPDATE_WEEKS, getOnlyResourceHourData),
    takeEvery(actionTypes.SAVE_TO_SERVER, saveResourceHourData),

    takeEvery(actionTypes.SET_RESOURCES, checkStoredData),
    takeEvery(actionTypes.SET_PROJECTS, checkStoredData)
  ]
}

export default projectSaga
