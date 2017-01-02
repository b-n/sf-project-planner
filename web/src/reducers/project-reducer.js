import actions from '../actions/project'

import { projects } from '../dummy-data'

// dummy code - TODO -> implement state changes
const projectReducer = (state = projects, action) => {
  switch (action.type) {
    case actions.ADD_PROJECT:
      return state
    case actions.REMOVE_PROJECT:
      return state
    case actions.ADD_HOURS:
      return state
    case actions.REMOVE_HOURS:
      return state
    default:
      return state
  }
}

export default projectReducer
