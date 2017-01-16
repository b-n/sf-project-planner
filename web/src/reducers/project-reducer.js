import actionTypes from '../actions/action-types'

import projects from '../dummy-data'


const initialState = projects

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return [...state, action.payload.newProject]
    case actionTypes.REMOVE_PROJECT:
      return state.splice(action.payload.projectIndex, 1)
    default:
      return state
  }
}

export default projectReducer
