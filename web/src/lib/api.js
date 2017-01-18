import endpoints from '../endpoints'

export function doLogin(username, password) {
    
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
    .then(response => response.json())
    .then(data => {
      if (!data.bearerToken) {
        reject(new Error('Wrong username/password'))
        return;
      } 

      resolve(data);
    })
    .catch(e => {
      reject(new Error('Error trying to login'))
    })

  })
}
