import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'

import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'
import Spinner from '../components/spinner'

class GlobalLayout extends Component {

  componentDidMount() {
    if (!this.props.loggedIn && this.props.location.pathname !== '/') this.context.router.push('/')
  }

  render() {
    return (
      <div className='slds'>
        <GlobalHeader/>
        <main>
          <Spinner show={this.props.isLoading}/>
          {this.props.children}
        </main>
        <GlobalFooter/>
      </div>
    )
  }
}

GlobalLayout.propTypes = {
  children: PropTypes.element
}

GlobalLayout.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>  {
  return {
    isLoading: state.global.isLoading,
    loggedIn: state.login.loggedIn
  }
}

export default connect(mapStateToProps)(GlobalLayout)
