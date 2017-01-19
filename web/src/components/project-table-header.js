import React from 'react'
import moment from 'moment'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = (props) => {

  const { weekFrom, weekTo } = props;
  const numberOfWeeks = weekTo.diff(weekFrom, 'week')
  const weeksArray = Array.from({ length: numberOfWeeks }, (value, index) => moment(weekFrom).add(index, 'week').format('YYYY-MM-DD'))

  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Project'/>
        {
          weeksArray.map(week => {
            return <ProjectTableHeaderCol colName={week} key={week}/>
          })
        }
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
