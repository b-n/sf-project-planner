import { createStore } from 'redux'
import { connect } from 'react-redux'

import rootReducer from './reducers/root-reducer'

const store = createStore(rootReducer)

const mapStateToProps = (state) =>  {
  return {
    'projects': state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export { store, connector }
