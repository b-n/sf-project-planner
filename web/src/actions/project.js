import { createAction } from 'redux-actions'
import actionTypes from './action-types'
import Project from '../models/project'
import uuidV4 from 'uuid/v4'

export const addProject = createAction(actionTypes.ADD_PROJECT, () => ({ newProject: new Project(uuidV4())}))
export const removeProject = createAction(actionTypes.REMOVE_PROJECT, index => ({ projectId: index }))
export const fetchProjects = createAction(actionTypes.FETCH_PROJECTS)
export const getResources = createAction(actionTypes.GET_RESOURCES)
export const updateProjectUuidToId = createAction(actionTypes.PROJECT_UUID_TO_ID_UPDATE, (uuid, projectId) => ({ uuid, projectId }))
export const updateResourceValue = createAction(actionTypes.UPDATE_RESOURCE_VALUE, (hours, projectId, week) => ({ hours, projectId, week }))
export const updateWeeks = createAction(actionTypes.UPDATE_WEEKS, (weekFrom, weekTo) => ({ weekFrom, weekTo }))
export const saveToServer = createAction(actionTypes.SAVE_TO_SERVER)
