import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
          <h1 onClick={() => this.props.increment()}>{this.props.count}</h1>
          <h2 onClick={() => this.props.decrement()}>{this.props.count}</h2>
      </div>
    )
  }
}
