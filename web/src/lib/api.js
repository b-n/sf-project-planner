import endpoints from '../endpoints'
import { v4 as uuidV4 } from 'uuid'

export function postLogin(username, password) {

  if (!username || !password) return Promise.reject(new Error('Need a username and password'))

  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      username,
      password
    })

    fetch(endpoints.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      if (!data.token) {
        reject(new Error('Wrong username/password'))
      }

      resolve(data);
    })
    .catch(e => {
      reject(new Error('Error trying to login'))
    })

  })
}

export function getProjects(token) {

  if (!token) return Promise.reject(new Error('Not authenticated'))

  return new Promise((resolve, reject) => {

    fetch(endpoints.projects, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch(e => {
      reject(new Error('Error trying to login'))
    })
  })
}

export function getResources(token, { weekstart, weekend }) {
  //TODO holy smokes batman, this function needs to be refactored a bit
  if (!token) return Promise.reject(new Error('Not authenticated'))
  if (!weekstart || !weekend) return Promise.reject(new Error('Invalid date range'))

  return new Promise((resolve, reject) => {

    const params = {
      weekstart,
      weekend
    }

    const urlParams = Object.keys(params)
      .map(key => key + '=' + encodeURIComponent(params[key]))
      .join('&')

    fetch(`${endpoints.resources}?${urlParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {

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
      resolve(projectData)
    }).catch(e => {
      reject(new Error('Error processing get resources call'))
    })
  })
}


function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}
