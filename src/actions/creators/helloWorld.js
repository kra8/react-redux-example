import {
  FETCH_HELLO_WORLD,
  FETCH_HELLO_WORLD_SUCCESS,
  FETCH_HELLO_WORLD_FAIL
} from 'app/actions/types/helloWorld'

const uri = 'https://tojswukl8e.execute-api.ap-northeast-1.amazonaws.com/prod/hello-world'

export const fetchHelloWorldStart = () => ({
  type: FETCH_HELLO_WORLD
})

export const fetchHelloWorldSuccess = message => ({
  type: FETCH_HELLO_WORLD_SUCCESS,
  message
})

export const fetchHelloWorldFail = () => ({
  type: FETCH_HELLO_WORLD_FAIL
})

//
// thunk middleware supported
//
export const fetchTasks = () => {
  return dispatch => {
    dispatch(fetchHelloWorldStart())

    return fetch(uri)
      .then(response => response.json())
      .then(message => dispatch(fetchHelloWorldSuccess(message)))
      .catch(() => dispatch(fetchHelloWorldFail()))
  }
}

export const getHelloWorldIfNeeded = () => {
  return (dispatch, getState) => {
    if (getState().helloWorld.isFetching) {
      return Promise.resolve()
    } else {
      return dispatch(fetchTasks())
    }
  }
}
