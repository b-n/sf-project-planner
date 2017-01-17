import actionTypes from '../actions/action-types'

const initialState = {
  projectArray: [
    { name: 'WAP Group Migration', customer: 'WAP', id: '1', resources: []},
    { name: 'Guidion Service Cloud', customer: 'Guidion', id: '2', resources: []}
  ],
  weekTo: 5,
  weekFrom: 10,
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
