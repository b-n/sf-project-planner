import { v4 as uuidV4 } from 'uuid'

export default {
  login: state => state.login,
  projects: state => state.projects,
  projectData : state => state.projects.projectData,
  token: state => state.login.token,
  hasResourceData: state => Object.keys(state.projects.projectData).length !== 0,
  hasProjectData: state => state.projects.availableProjects.length !== 0,
  resourceDataFromAPI: resourceDataFromAPI,
  projectDataFromAPI: projectDataFromAPI
}

function resourceDataFromAPI(data) {
  //collect all resource hours by projectId
  const ProjectResourceHoursHashMap = data.reduce((accumulator, currentValue) => {

    const { Project__c, Week_Start__c } = currentValue

    return {
      ...accumulator,
      [ Project__c ]: {
        ...accumulator[Project__c],
        [ Week_Start__c ]: currentValue
      }
    }
  }, {});

  //create a Project Hashmap
  const ProjectHashMap = data.reduce = data.reduce((accumulator, currentValue) => {
    const { Project__c, Project__r } = currentValue

    return {
      ...accumulator,
      [ Project__c ] : {
        ...Project__r
      }
    }
  }, {})


  //generate final structure
  const projectData = Object.values(ProjectHashMap).reduce((accumulator, currentValue) => {
    const { Id, Name } = currentValue
    const uuid = uuidV4();

    return {
      ...accumulator,
      [ uuid ] : {
        uuid,
        Id,
        Name,
        values: {
          ...ProjectResourceHoursHashMap[Id]
        }
      }
    }
  }, {});

  return projectData
}

function projectDataFromAPI(data) {
  return data.map(item => {
    const { Id, Name } = item
    return { Id, Name }
  })
}
