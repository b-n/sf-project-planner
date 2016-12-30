import Redux from 'redux'
import ReactRedux from 'react-redux'

import RootReducer from './reducers/root-reducer '

const store = Redux.createStore(RootReducer)

const mapStateToProps = (state) =>  {
  return {
    'projects': state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const connector = ReactRedux.connect(mapStateToProps, mapDispatchToProps)
