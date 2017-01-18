import actionTypes from '../actions/action-types'
import moment from 'moment'

const initialState = {
  projectArray: [
    { Name: 'WAP Group Migration' },
    { Name: 'Guidion Service Cloud' }
  ],
  weekTo: moment().isoWeek(),
  weekFrom: moment().add('week', 5).isoWeek()
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return Object.assign({}, state, {
        projectArray: [...state.projectArray, action.payload.newProject]
      })
    case actionTypes.REMOVE_PROJECT:
      return Object.assign({}, state, {
        projectArray: [...state.projectArray.slice(0, action.payload.projectIndex), ...state.projectArray.slice(action.payload.projectIndex + 1)]
      })
    case actionTypes.UPDATE_WEEKS:
      return state
    default:
      return state
  }
}

export default projectReducer
