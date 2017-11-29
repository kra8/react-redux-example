import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

import reducers from 'app/store/reducers'

const enhancer = compose(
  applyMiddleware(
    thunk
  )
)

export const store = createStore(
  reducers,
  enhancer
)
