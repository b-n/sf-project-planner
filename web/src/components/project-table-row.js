import React, { PropTypes, Component } from 'react'
import { Typeahead } from 'react-typeahead'
import ProjectTableRowInput from './project-table-row-input'
import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg'

class ProjectTableRow extends Component {

  render() {
    const { Name, uuid, displayValues, Status } = this.props.project
    const typeaheadClasses = {
      results: 'slds-dropdown slds-dropdown--left',
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
        <td>
          {Status}
        </td>
        { displayValues.map((week, index) =>{
          return <ProjectTableRowInput
            key={index}
            hours={week.Hours__c}
            onChange={e=>{ this.props.updateResourceValue(e.target.value, uuid, week.Week_Start__c) }}
          />
        })}
        <td>
          <button className="slds-button slds-button--icon-border-filled" title="Delete" onClick={()=>{this.props.removeHandler(uuid)}}>
            <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref={utility + '#delete'}></use>
            </svg>
          </button>
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
