import loginSaga from './login-saga'

export default function* rootSaga(){
  yield[
    loginSaga()
  ]
}
