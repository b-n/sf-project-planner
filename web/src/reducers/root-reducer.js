import Redux from 'redux'
import ReactRedux from 'react-redux'

const initialState = {
  'projects': [{ 'Project Name': 'WAP Group Migration'}, {'Project Name': 'Guidion Service Cloud'}]
}

const RootReducer = (state, action) => {
  if (!state)
    state = initialState
    switch (action.type) {
      case '':
        return
      default:
        return state
    }
}

const mapStateToProps = (state) =>  {
  return {
    'projects': state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default RootReducer
