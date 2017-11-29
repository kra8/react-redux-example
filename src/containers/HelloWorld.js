import { connect } from 'react-redux'

import HelloWorld from 'app/components/HelloWorld.jsx'
import { getHelloWorldIfNeeded } from 'app/actions/creators/helloWorld'

const mapStateToProps = state => ({
  message: state.helloWorld.message,
})

const mapDispatchToProps = dispatch => ({
  getHelloWorldIfNeeded: () => {
    dispatch(getHelloWorldIfNeeded())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
