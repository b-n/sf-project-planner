import loginSaga from './login-saga'
import projectSaga from './project-saga'

export default function* rootSaga(){
  yield[
    loginSaga(),
    projectSaga()
  ]
}
