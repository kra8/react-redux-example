import {
  FETCH_SAMPLE_DATA,
  FETCH_SAMPLE_DATA_SUCCESS,
  FETCH_SAMPLE_DATA_FAIL
} from 'app/actions/types/sampleData'

const initialState = {
  isFetching: false,
  hasError: false,
  user: {}
}

export const sampleData = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SAMPLE_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })

    case FETCH_SAMPLE_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      })

    case FETCH_SAMPLE_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true
      })

    default:
      return state
  }
}
