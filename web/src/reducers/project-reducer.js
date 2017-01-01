import Redux from 'redux'
import ReactRedux from 'react-redux'

import projectActions from '../actions/project'

const initialState = {
  'projects': [{ 'Project Name': 'WAP Group Migration'}, {'Project Name': 'Guidion Service Cloud'}]
}

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return
    default:
      return state
    }
}

export default ProjectReducer
