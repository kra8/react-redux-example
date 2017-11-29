import {
  FETCH_SAMPLE_DATA,
  FETCH_SAMPLE_DATA_SUCCESS,
  FETCH_SAMPLE_DATA_FAIL
} from 'app/actions/types/sampleData'

const uri = 'https://tojswukl8e.execute-api.ap-northeast-1.amazonaws.com/prod/sample-json'

export const fetchSampleDataStart = () => ({
  type: FETCH_SAMPLE_DATA
})

export const fetchSampleDataSuccess = user => ({
  type: FETCH_SAMPLE_DATA_SUCCESS,
  user
})

export const fetchSampleDataFail = () => ({
  type: FETCH_SAMPLE_DATA_FAIL
})

export const fetchSampleData = () => {
  return dispatch => {
    dispatch(fetchSampleDataStart())

    return fetch(uri)
      .then(response => response.json())
      .then(user => dispatch(fetchSampleDataSuccess(user)))
      .catch(() => dispatch(fetchSampleDataFail()))
  }
}

export const getSampleDataIfNeeded = () => {
  return (dispatch, getState) => {
    if (getState().sampleData.isFetching) {
      return Promise.resolve()
    } else {
      return dispatch(fetchSampleData())
    }
  }
}
