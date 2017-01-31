import React, { Component } from 'react'

class ProjectTableDatePicker extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeValue = this.changeValue.bind(this)

    const { weekFrom, weekTo } = props
    this.state = {
      weekFrom,
      weekTo
    }
  }

  changeValue(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.submit(this.state.weekFrom, this.state.weekTo)
  }

  render() {
    return (
      <div className='slds-m-bottom--small slds-float--right'>
        <form className="slds-form--inline" onSubmit={this.handleSubmit}>
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="weekFrom">From</label>
            <div className="slds-form-element__control">
              <input type="date" id="weekFrom" className="slds-input" value={this.state.weekFrom} onChange={this.changeValue}/>
            </div>
          </div>
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="weekTo">To</label>
            <div className="slds-form-element__control">
              <input type="date" id="weekTo" className="slds-input" value={this.state.weekTo} onChange={this.changeValue}/>
            </div>
          </div>
          <div className="slds-form-element">
            <button type="submit" className="slds-button slds-button--brand">Set</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ProjectTableDatePicker
