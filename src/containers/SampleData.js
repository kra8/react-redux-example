import { connect } from 'react-redux'
import SampleData from "app/components/SampleData.jsx"
import { getSampleDataIfNeeded } from 'app/actions/creators/sampleData'

const mapStateToProps = state => ({
  user: state.sampleData.user
})

const mapDispatchToProps = dispatch => {
  return {
    getSampleDataIfNeeded: () => {
      dispatch(getSampleDataIfNeeded())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleData)
