import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/project'

import ProjectTableDatePicker from './project-table-date-picker'
import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'
import ProjectTableSaveButton from './project-table-save-button'
import ProjectAddNew from './project-table-add-new'

class ProjectTable extends Component {
  constructor(){
      super()
      this.saveToServer = this.saveToServer.bind(this)
      this.addProject = this.addProject.bind(this)
  }

  addProject(){
    this.props.dispatch(actionCreators.addProject())
  }

  removeProject(index){
    this.props.dispatch(actionCreators.removeProject(index))
  }

  saveToServer(){
    this.props.dispatch(actionCreators.saveToServer())
  }

  render() {
    return (
      <div>
        <ProjectTableDatePicker/>
        <table className='slds-table slds-table--bordered slds-table--fixed-layout' role='grid'>
          <ProjectTableHeader weekFrom={5} weekTo={9}/>
          <tbody>
            {this.props.projects.map((project) => {
              return <ProjectTableRow {...project} key={project.id} weekFrom={5} weekTo={9} removeHandler={this.removeProject}/>
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
    projects: state.projects,
    weekFrom: state.weekFrom,
    weekTo: state.weekTo
  }
}


export default connect(mapStateToProps)(ProjectTable)
