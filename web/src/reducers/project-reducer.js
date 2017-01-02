import dummyData from '../dummy-data'

const projectReducer = (state = dummyData.projects, action) => {
  switch (action.type) {
    case '':
      return state
    default:
      return state
  }
}

export default projectReducer
