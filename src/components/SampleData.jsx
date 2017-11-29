import React from 'react'
import { Component } from 'react'

export default class SampleData extends Component {
  constructor(props) {
    super(props)

    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler () {
    this.props.getSampleDataIfNeeded()
  }

  render() {
    return (
      <div style={{width: "200px", backgroundColor:"gray"}}>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.email}</p>
        <input type="button" onClick={this.onClickHandler} value="call api"/>
      </div>
    )
  }
}
