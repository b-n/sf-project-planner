import { handleActions } from 'redux-actions'
import moment from 'moment'

const initialState = {
  projectData: {},
  weekFrom: moment().startOf('isoWeek'),
  weekTo: moment().add(5, 'week').startOf('isoWeek'),
  isLoading: true,
  availableProjects: [],
  dirty: false
}

const projectReducer = handleActions({
  ADD_PROJECT : (state, action) => ({
    ...state,
    projectData: {
      ...state.projectData,
      [ action.payload.newProject.uuid ] : {
        ...action.payload.newProject
      }
    },
    dirty: true
  }),

  REMOVE_PROJECT : (state, action) => {
    const { projectId } = action.payload

    const projectData = Object.values(state.projectData).reduce((accumulator, currentValue) => {
      const { uuid } = currentValue

      if (uuid === projectId) {
        currentValue.isHidden = true;
        currentValue.values = Object.values(currentValue.values).reduce((accumulator, value) => {
          return {
            ...accumulator,
            [ value.Week_Start__c ]: {
              ...value,
              Hours__c: 0
            }
          };
        }, {})
      }

      return {
        ...accumulator,
        [ uuid ]: currentValue
      }
    }, {})

    return {
      ...state,
      projectData,
      dirty: true
    }
  },

  PROJECT_UUID_TO_ID_UPDATE : (state, action) => ({
    ...state,
    projectData: {
      ...state.projectData,
      [ action.payload.uuid ] : {
        ...state.projectData[action.payload.uuid],
        Id: action.payload.projectId
      }
    }
  }),

  SET_RESOURCES : (state, action) => ({
      ...state,
      projectData: action.payload.projectData,
      dirty: false,
      isLoading: false
  }),

  SET_PROJECTS : (state, action) => ({
    ...state,
    availableProjects: action.payload.availableProjects,
    isLoading: false
  }),

  UPDATE_RESOURCE_VALUE : (state, action) => {
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
      },
      dirty: true
    }
  },

  UPDATE_WEEKS : (state, action) => ({
    ...state,
    weekFrom: moment(action.payload.weekFrom),
    weekTo: moment(action.payload.weekTo),
    isLoading: true
  }),

  SAVE_TO_SERVER : (state, action) => ({
    ...state,
    isLoading: true
  }),
  SAVE_SUCCESS : (state, action) => ({
    ...state,
    isLoading: false,
    dirty: false
  }),
  SAVE_ERROR : (state, action) => ({ ...state })

}, initialState)


export default projectReducer
