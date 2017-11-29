import React from 'react'
import { Component } from 'react'

export default class HelloWorld extends Component {
  componentDidMount() {
    this.props.getHelloWorldIfNeeded()
  }

  render() {
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    )
  }
}
