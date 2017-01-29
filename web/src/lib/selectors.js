export default {
  login: state => state.login,
  projects: state => state.projects,
  projectData : state => state.projects.projectData,
  token: state => state.login.token
}
