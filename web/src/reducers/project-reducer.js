import actionTypes from '../actions/action-types'
import moment from 'moment'

const initialState = {
  projectArray: [],
  weekFrom: moment().isoWeek(),
  weekTo: moment().add(5, 'week').isoWeek(),
  fetchingProjects: true
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return Object.assign({}, state, {
        projectArray: [...state.projectArray, action.payload.newProject]
      })
    case actionTypes.REMOVE_PROJECT:
      return Object.assign({}, state, {
        projectArray: [...state.projectArray.slice(0, action.payload.projectIndex),
                       ...state.projectArray.slice(action.payload.projectIndex + 1)]
      })
    case actionTypes.PROJECTS_FETCHED:
      return Object.assign({}, state, {
        fetchingProjects: false
      })
    case actionTypes.UPDATE_WEEKS:
      return state
    case actionTypes.SAVE_TO_SERVER:
      return state
    case actionTypes.SAVE_SUCCESS:
      return state
    case actionTypes.SAVE_ERROR:
      return state
    default:
      return state
  }
}

export default projectReducer
