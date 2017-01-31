export default {
  login: state => state.login,
  projects: state => state.projects,
  projectData : state => state.projects.projectData,
  token: state => state.login.token,
  hasResourceData: state => Object.keys(state.projects.projectData).length !== 0,
  hasProjectData: state => state.projects.availableProjects.length !== 0
}
