import React, { PropTypes, Component } from 'react'
import { Typeahead } from 'react-typeahead'
import ProjectTableRowInput from './project-table-row-input'

class ProjectTableRow extends Component {

  render() {
    const { Name, uuid, displayValues } = this.props.project
    const typeaheadClasses = {
      results: 'slds-dropdown',
      listItem: 'slds-dropdown__item',
      input: 'slds-input',
      hover: 'slds-theme--shade'
    }
    const typeaheadBugFix = () => {
      this.refs.typeahead.setState({ showResults: true })
    }

    return (
      <tr>
        <td>
          <Typeahead
            ref="typeahead"
            options={this.props.availableProjects}
            filterOption='Name'
            displayOption='Name'
            value={Name}
            maxVisible={7}
            customClasses={typeaheadClasses}
            onChange={typeaheadBugFix}
            onOptionSelected={e=>{ this.props.updateProjectUuidToId(uuid, e.Id)}}
          />
        </td>
        { displayValues.map((week, index) =>{
          return <ProjectTableRowInput
            key={index}
            hours={week.Hours__c}
            onChange={e=>{ this.props.updateResourceValue(e.target.value, uuid, week.Week_Start__c) }}
          />
        })}
        <td>
          <button onClick={()=>{this.props.removeHandler(uuid)}}>Remove</button>
        </td>
      </tr>
    )
  }
}

ProjectTableRow.propTypes = {
  project: PropTypes.object,
  weekFrom: PropTypes.object,
  weekTo: PropTypes.object,
  removeHandler: PropTypes.func,
  updateProjectUuidToId: PropTypes.func,
  updateResourceValue: PropTypes.func
}

export default ProjectTableRow
