import actionTypes from './action-types'
import Project from '../models/project'

export const addProject = () => {
  return {
    type: actionTypes.ADD_PROJECT,
    payload: {
      newProject: new Project()
    }
  }
}

export const removeProject = (index) => {
  return {
    type: actionTypes.REMOVE_PROJECT,
    payload: {
      projectIndex: index
    }
  }
}

export const saveToServer = (projects) => {
  return {
    type: actionTypes.SAVE_TO_SERVER,
    payload: {
      projects: projects
    }
  }
}
