import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProjectTable from '../components/project-table'


// TODO - turn project page into a more generic view component after login
class Projects extends Component {

  componentDidMount() {
    if (!this.props.loggedIn) this.context.router.push('/')
  }

  render() {
    return (
      <div className='slds-container--center slds-container--x-large'>
        <ProjectTable />
      </div>
    )
  }
}

Projects.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>  {
  return {
    loggedIn: state.login.loggedIn
  }
}

export default connect(mapStateToProps)(Projects)
