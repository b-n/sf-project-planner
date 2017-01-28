import actionTypes from '../actions/action-types'
import moment from 'moment'

const initialState = {
  projectData: {},
  weekFrom: moment().startOf('isoWeek'),
  weekTo: moment().add(5, 'week').startOf('isoWeek'),
  fetchingProjects: true,
  availableProjects: [
    {
      Id: 'idgoeshere',
      Name: 'goeshere'
    }
  ]
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      const { newProject } = action.payload
      const { uuid } = newProject

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [ uuid ]: {
            ...newProject
          }
        }
      }
    case actionTypes.REMOVE_PROJECT:
      const { projectIndex } = action.payload

      const newProjectData = Object.values(state.projectData).reduce((accumulator, currentValue) => {
        if (currentValue.uuid === projectIndex) return accumulator;

        return {
          ...accumulator,
          [ currentValue.uuid ]: currentValue
        }
      }, {})

      return {
        ...state,
        projectData: newProjectData
      }
    case actionTypes.UPDATE_WEEKS:
      return state
    case actionTypes.SET_RESOURCES:
      const { projectData } = action.payload
      return {
        ...state,
        projectData
      }
    case actionTypes.SET_PROJECTS:
      const { availableProjects } = action.payload
      return {
        ...state,
        availableProjects,
        fetchingProjects: false
      }
    case actionTypes.UPDATE_RESOURCE_VALUE:
      const { hours, week, projectId } = action.payload

      const currentValue = state.projectData[projectId].values[week];

      const values = {
        ...state.projectData[projectId].values,
        [ week ] : {
          ...currentValue,
          Hours__c: hours,
          Week_Start__c: week
        }
      }

      return {
        ...state,
        projectData: {
          ...state.projectData,
          [ projectId ]: {
            ...state.projectData[projectId],
            values
          }
        }
      }
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
