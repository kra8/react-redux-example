import { combineReducers } from 'redux'
import { counter } from 'app/store/reducers/counter'
import { helloWorld } from 'app/store/reducers/helloWorld'
import { sampleData } from 'app/store/reducers/sampleData'

const reducers = combineReducers({
  counter,
  helloWorld,
  sampleData
})

export default reducers
