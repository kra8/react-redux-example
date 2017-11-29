import {
  FETCH_HELLO_WORLD,
  FETCH_HELLO_WORLD_SUCCESS,
  FETCH_HELLO_WORLD_FAIL
} from 'app/actions/types/helloWorld'

const initialState = {
  isFetching: false,
  hasError: false,
  message: ''
}

export const helloWorld = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_HELLO_WORLD:
      return Object.assign({}, state, {
        isFetching: true
      })

    case FETCH_HELLO_WORLD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

    case FETCH_HELLO_WORLD_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true
      })

    default:
      return state
  }
}
