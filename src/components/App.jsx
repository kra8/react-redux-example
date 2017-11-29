import React from "react"
import { Provider } from 'react-redux'
import { store } from 'app/store/configureStore'
import HomeContainer from 'app/containers/HomeContainer'
import HelloWorld from 'app/containers/HelloWorld'
import SampleData from 'app/containers/SampleData'

const App = () => (
  <Provider store={store}>
    <div>
      <HomeContainer />
      <HelloWorld />
      <SampleData />
    </div>
  </Provider>
)

export default App
