import endpoints from '../endpoints'

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
      const projectData = data.reduce((accumulator, currentValue) => {

        const projectId = currentValue.Project__c

        if (accumulator.hasOwnProperty(projectId)) {
          const newProjectValues = {
            ...accumulator[projectId].values,
            [ currentValue.Week_Start__c ] : currentValue
          };

          return {
            ...accumulator,
            [ projectId ] : {
              ...accumulator[projectId],
              values: newProjectValues
            }
          }
        }

        return {
          ...accumulator,
          [ projectId ] : {
            id: currentValue.Project__c,
            name: currentValue.Project__r.Name,
            values: {
              [currentValue.Week_Start__c] : currentValue
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
