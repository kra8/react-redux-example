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
// なぜ、ここでネストした高階関数を定義しないといけないのか。
// ミドルウェアによって、カリー化されているから？
// この場合、uncurringでカリー化の逆の操作を用いて高階関数のネストを防げます。
// https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400
//
// uncurring適用前:
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
// uncurring適用後:
export const fetchTasks = () => dispatch => {
  dispatch(fetchHelloWorldStart())

  return fetch(uri)
    .then(response => response.json())
    .then(message => dispatch(fetchHelloWorldSuccess(message)))
    .catch(() => dispatch(fetchHelloWorldFail()))
}

// dispatch(fetchTasks())は、おそらく内部では以下のような感じで実装されている？
//
//   const dispatch = func => {
//     func(dispatch, getState)
//   }
//
// つまり、
//   return dispatch(fetchTasks())
// と書いているところを、
//   return dispatch(fetchTasks)
// とすれば、以下のように uncurringしなくてよい
//   export const fetchTasks = dispatch => {
//     dispatch(fetchHelloWorldStart())
//
//     return fetch(uri)
//     .then(response => response.json())
//     .then(message => dispatch(fetchHelloWorldSuccess(message)))
//     .catch(() => dispatch(fetchHelloWorldFail()))
//   }
//
// しかし、このようにすると任意の引数が取れないため、カリー化を行う必要がある。
//   dispatch(fetchPosts(data)) <= こんな風に使いたい
//
// 結局、"任意の引数"と、dispatch, getStateなどの"ミドルウェアが提供する引数"を
// どちらも使いたいというのを叶えるために、カリー化を用いている。
// func(opt)(dispatch)
//
export const getHelloWorldIfNeeded = () => (dispatch, getState) => {
  if (getState().helloWorld.isFetching) {
    return Promise.resolve()
  } else {
    return dispatch(fetchTasks())
  }
}
