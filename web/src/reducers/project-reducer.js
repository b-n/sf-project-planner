import Redux from 'redux'
import ReactRedux from 'react-redux'

import projectActions from '../actions/project'

import { projects } from '../dummy-data'

const initialState = projects

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return
    default:
      return state
  }
}

export default ProjectReducer
