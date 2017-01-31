import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/project'

import moment from 'moment'
import ProjectTableDatePicker from './project-table-date-picker'
import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'
import ProjectTableSaveButton from './project-table-save-button'
import ProjectAddNew from './project-table-add-new'
import Spinner from './spinner'

class ProjectTable extends Component {

  constructor() {
    super()
    this.addProject = this.addProject.bind(this)
    this.removeProjectHandler = this.removeProjectHandler.bind(this)
    this.saveToServer = this.saveToServer.bind(this)
    this.updateResourceValue = this.updateResourceValue.bind(this)
    this.updateProjectUuidToId = this.updateProjectUuidToId.bind(this)
    this.changeDate = this.changeDate.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.getResources())
    this.props.dispatch(actionCreators.fetchProjects())
  }

  addProject() {
    this.props.dispatch(actionCreators.addProject())
  }

  removeProjectHandler(projectId) {
    this.props.dispatch(actionCreators.removeProject(projectId))
  }

  saveToServer() {
    this.props.dispatch(actionCreators.saveToServer())
  }

  updateResourceValue(hours, projectId, week) {
    this.props.dispatch(actionCreators.updateResourceValue(+hours, projectId, week))
  }

  updateProjectUuidToId(uuid, projectId) {
    this.props.dispatch(actionCreators.updateProjectUuidToId(uuid, projectId))
  }

  changeDate(weekFrom, weekTo) {
    if (this.props.dirty) {
      alert('Computer says no, you need to refresh the form before you can set the date')
      return
    }
    this.props.dispatch(actionCreators.updateWeeks(weekFrom, weekTo))
  }

  render() {
    const { availableProjects, projects, weekFrom, weekTo, isLoading } = this.props
    const numberOfWeeks = weekTo.diff(weekFrom, 'week')
    const weeksArray = Array.from({ length: numberOfWeeks }, (value, index) => moment(weekFrom).add(index, 'week').format('YYYY-MM-DD'))

    const projectData = projects.map(project => {
      const displayValues = weeksArray.map(week => {
        if (project.values.hasOwnProperty(week)) {
          return project.values[week];
        }
        return {
          Week_Start__c: week,
          Hours__c: 0
        }
      })

      return {
        ...project,
        displayValues
      }
    })

    return (
      <div>
        <Spinner show={isLoading}/>
        <ProjectTableDatePicker
          weekFrom={moment(weekFrom).format('YYYY-MM-DD')}
          weekTo={moment(weekTo).format('YYYY-MM-DD')}
          submit={this.changeDate}
        />
        <table className='slds-table slds-table--bordered slds-table--cell-buffer' role='grid'>
          <ProjectTableHeader weeksArray={weeksArray} />
          <tbody>
            {
              projectData.map(project => {
                return <ProjectTableRow
                  availableProjects={availableProjects}
                  project={project}
                  key={project.uuid}
                  removeHandler={this.removeProjectHandler}
                  updateProjectUuidToId={this.updateProjectUuidToId}
                  updateResourceValue={this.updateResourceValue}
                />
              })
            }
          </tbody>
        </table>
        <ProjectAddNew onClick={this.addProject} />
        <ProjectTableSaveButton submit={this.saveToServer} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const projects = Object.values(state.projects.projectData);

  //Contains list from the api, minus projects already on screen unless they are hidden
  const availableProjects = state.projects.availableProjects.filter(avPrj => {
    return !projects.some(prj => {
      if (prj.isHidden === true) return false;
      return prj.Id === avPrj.Id
    });
  });

  return {
    ...state.projects,
    projects: projects.filter(proj => !proj.isHidden),
    availableProjects
  }
}


export default connect(mapStateToProps)(ProjectTable)
