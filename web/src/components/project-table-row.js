import React, { PropTypes, Component } from 'react'
import { Typeahead } from 'react-typeahead'
import ProjectTableRowInput from './project-table-row-input'

class ProjectTableRow extends Component {

  render() {
    const { name, id, displayValues } = this.props.project
    const typeaheadClasses = {
      results: 'slds-dropdown',
      listItem: 'slds-dropdown__item',
      input: 'slds-input',
      hover: 'slds-theme--shade'
    }
    const typeaheadBugFix = () => {
      this.refs.typeahead.setState({ showResults: true })
    }
    const typeaheadSelected = (e) => {
      console.log('Value of typeahead', e)
    }

    return (
      <tr>
        <td>
          <Typeahead
            ref="typeahead"
            options={this.props.availableProjects}
            filterOption='Name'
            displayOption='Name'
            value={name}
            maxVisible={7}
            customClasses={typeaheadClasses}
            onChange={typeaheadBugFix}
            onOptionSelected={typeaheadSelected}
          />
        </td>
        { displayValues.map((week, index) =>{
          return <ProjectTableRowInput key={index} week={week}/>
        })}
        <td>
          <button onClick={ () => { this.props.removeHandler(id) } }>Remove</button>
        </td>
      </tr>
    )
  }
}

ProjectTableRow.propTypes = {
  project: PropTypes.object,
  weekFrom: PropTypes.object,
  weekTo: PropTypes.object,
  removeHandler: PropTypes.func
}

export default ProjectTableRow
