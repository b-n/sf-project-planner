import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/project'

import ProjectTableDatePicker from './project-table-date-picker'
import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'
import ProjectTableSaveButton from './project-table-save-button'
import ProjectAddNew from './project-table-add-new'

class ProjectTable extends Component {

  constructor() {
      super()
      this.addProject = this.addProject.bind(this)
      this.projectNameOnChange = this.projectNameOnChange.bind(this)
      this.removeProjectHandler = this.removeProjectHandler.bind(this)
      this.saveToServer = this.saveToServer.bind(this)
  }

  addProject() {
    this.props.dispatch(actionCreators.addProject())
  }

  projectNameOnChange() {

  }
  removeProjectHandler(index) {
    this.props.dispatch(actionCreators.removeProject(index))
  }

  saveToServer() {
    this.props.dispatch(actionCreators.saveToServer())
  }

  render() {
    return (
      <div>
        <ProjectTableDatePicker/>
        <table className='slds-table slds-table--bordered slds-table--fixed-layout' role='grid'>
          <ProjectTableHeader weekFrom={5} weekTo={9}/>
          <tbody>
            {this.props.projects.map((project, index) => {
              return <ProjectTableRow {...project} index={index} key={index} weekFrom={5} weekTo={9}
                      removeHandler={this.removeProjectHandler}/>
            })}
          </tbody>
        </table>
        <ProjectAddNew onClick={this.addProject} />
        <ProjectTableSaveButton onClick={this.saveToServer} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    projects: state.projects.projectArray,
    weekFrom: state.projects.weekFrom,
    weekTo: state.projects.weekTo
  }
}


export default connect(mapStateToProps)(ProjectTable)
