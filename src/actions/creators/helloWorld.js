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
// curryingという、複数の引数の関数を一つの引数の関数に減らす方法があります。
// おそらく、ここでネストした高階関数を定義しないといけないのは、
// ミドルウェアによって、カリー化されているから？
// この場合、uncurringでカレー化の逆の操作を用いて高階関数のネストを防げます。
// https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400
//
// export const fetchTasks = () => {
//   return dispatch => {
//     dispatch(fetchHelloWorldStart())
//
//     return fetch(uri)
//       .then(response => response.json())
//       .then(message => dispatch(fetchHelloWorldSuccess(message)))
//       .catch(() => dispatch(fetchHelloWorldFail()))
//   }
// }
export const fetchTasks = () => dispatch => {
  dispatch(fetchHelloWorldStart())

  return fetch(uri)
    .then(response => response.json())
    .then(message => dispatch(fetchHelloWorldSuccess(message)))
    .catch(() => dispatch(fetchHelloWorldFail()))
}

export const getHelloWorldIfNeeded = () => (dispatch, getState) => {
  if (getState().helloWorld.isFetching) {
    return Promise.resolve()
  } else {
    return dispatch(fetchTasks())
  }
}
