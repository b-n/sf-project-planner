import { createAction } from 'redux-actions'
import actionTypes from './action-types'

export const showToast = createAction(actionTypes.SHOW_TOAST, (message, type) => ({ message, type }))
export const hideToast = createAction(actionTypes.HIDE_TOAST)