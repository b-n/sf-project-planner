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
    .then(resolve)
    .catch(e => {
      reject(new Error('Error trying to login'))
    })
  })
}

export function getResources(token, { weekstart, weekend }) {
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
    .then(resolve)
    .catch(e => {
      reject(new Error('Error processing get resources call'))
    })
  })
}

export function saveResources(token, data) {
  if (!token) return Promise.reject(new Error('Not authenticated'))

  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)

    fetch(endpoints.resources, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(resolve)
    .catch(e => {
      reject(new Error('Error trying to login'))
    })
  });
}


function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}
