import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_PROJECT, REMOVE_PROJECT, ADD_HOURS, REMOVE_HOURS } from '../actions/action-types'

import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'

class ProjectTable extends Component {
  render() {
    return (
      <table className='slds-table slds-table--bordered slds-table--fixed-layout' role='grid'>
        <ProjectTableHeader />
        <tbody>
          {this.props.projects.map((project) => {
            return <ProjectTableRow {...project} key={project.id} />
          })}
        </tbody>
      </table>
    )
  }
}


const mapStateToProps = (state) =>  {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: () => {
      dispatch(ADD_PROJECT)
    },
    removeProject: () => {
      dispatch(REMOVE_PROJECT)
    },
    addHours: () => {
      dispatch(ADD_HOURS)
    },
    removeHours: () => {
      dispatch(REMOVE_HOURS)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable)
