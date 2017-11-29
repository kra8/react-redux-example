import { connect } from 'react-redux'
import Home from "app/components/Home.jsx"
import { increment } from 'app/actions/creators/counter'
import { decrement } from 'app/actions/creators/counter'

const mapStateToProps = state => ({
  count: state.counter.count,
})

const mapDispatchToProps = dispatch =>({
  increment: () => {
    dispatch(increment())
  },
  decrement: () => {
    dispatch(decrement())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
