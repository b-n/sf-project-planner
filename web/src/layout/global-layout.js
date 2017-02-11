import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'
import * as actionCreators from '../actions/global'

import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'
import Spinner from '../components/spinner'
import Toaster from '../components/toast'

class GlobalLayout extends Component {

  componentDidMount() {
    if (!this.props.loggedIn && this.props.location.pathname !== '/') this.context.router.push('/')
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.loggedIn && nextProps.location.pathname !== '/') this.context.router.push('/')
  }

  render() {
    const { isLoading, toastMessage, toastType, showToast, children } = this.props
    return (
      <div className='slds'>
        <GlobalHeader/>
        <main>
          <Spinner show={isLoading}/>
          <Toaster
            message={toastMessage}
            type={toastType}
            hideToast={() => this.props.dispatch(actionCreators.hideToast())}
            show={showToast}/>
          {children}
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
    loggedIn: state.login.loggedIn,
    showToast: state.global.showToast,
    toastMessage: state.global.toastMessage,
    toastType: state.global.toastType
  }
}

export default connect(mapStateToProps)(GlobalLayout)
