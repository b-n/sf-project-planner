import actionTypes from '../actions/action-types'

import projects from '../dummy-data'


const initialState = projects

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return [...state, action.payload.newProject]
    case actionTypes.REMOVE_PROJECT:
      return state
    case actionTypes.ADD_HOURS:
      return state
    case actionTypes.REMOVE_HOURS:
      return state
    default:
      return state
  }
}

export default projectReducer
