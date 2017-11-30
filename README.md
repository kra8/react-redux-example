# React-Redux Example

## Start Demos
``` sh
$ npm install
$ npm run build
$ npm start
```

Then, open the http://localhost:8888

## チュートリアルとの差異
* index.htmlとdistディレクトリをpublicディレクトリ配下に移動しています。
* importに相対パスを用いるのをやめて、エイリアスを用いています。
* tasksとなっていた部分を全てsampleDataに変更しています。
* actionsディレクトリ以下のディレクトリ名を変更しています。

## React-Reduxで作るときの流れ
Redux部分
1. ActionTypesを宣言する
2. ActionCreaterを作成する
3. Reducerを作成する
4. combineReducersに登録する

React部分
1. Componentを作成する

React-Redux部分
1. Containersを作成する

## 使用しているES6の基本構文(一部)

* 関数リテラル

今まで:
``` js
function fetchTasks() {
    return {
        type: FETCH_TASKS
    };
}
```

ES6:
``` js
const fetchTasks = () => {
    return {
        type: FETCH_TASKS
    }
}
```

さらに、その関数が単一のオブジェクトを返す時以下のように書ける
``` js
const fetchTasks = () => ({
    type: FETCH_TASKS
})
```

また、引数が一つの場合のみ、以下のように`()`を省いて書ける
``` js
const fetchTasksSuccess = tasks => ({
    type: FETCH_TASKS_SUCCESS,
    tasks
})
```

## 基本中の基本
* 変数

基本的に変数は`let`と`const`を用いる
``` js
var foo = 'FOO'         //es5
let bar = 'BAR'         //es6
const bazz = 'BAZZ'     //es6

var foo = 'foo-extend'  // 再定義OK!
foo = 'foo-extend'      // 再格納OK!

let bar = 'bar-extend'  // 再定義NG!
bar = 'bar-extend'      // 再格納OK!

const bazz = 'bazz-extend' // 再定義NG!
bazz = 'bazz-extend'       // 再格納NG!
```

* 関数

``` js
// これは
var adder = function (a, b) {
    return a + b;
}

// これの省略形
var adder = new Function("a", "b", "return a + b");

// es6ではこう書く
const adder = (a, b) = {
    return a + b
}
```

* オブジェクト

``` js
// obj1とobj2はおなじ
var obj1 = {}
var obj2 = new Object()

// str1とstr2はおなじ
var str1 = 'hogehoge'
var str2 = String('hogehoge')

// 注意
obj1 == obj2  // false
obj1 === obj2 // false
str1 == str2  // true
str1 == str2  // true
```

JavaScriptでObjectの等価比較を行う時は、その「二つのインスタンスが同一であるか」を判断します。  
つまり、別々に宣言されたインスタンスは値が同じであっても同一とはみなされません。
``` js
const obj1 = {foo: "bar"}
const obj2 = {foo: "bar"}

console.log(obj1 === obj2) // false
```

インスタンスが同じである場合というのは以下のような場合をいいます
``` js
const obj1 = {foo: "bar"}
const obj2 = obj1

console.log(obj1 === obj2) // true
```

では、比較する際にどうするかというと、Javaのような`Object.equals`メソッドはないため、
中身を全て比較したり、stringにしたりなどをしてその等価性を判断します。
現在es6では`Object.is`メソッドが実装されているが、残念ながらオブジェクトの内容が同じかどうかを比較することはできません(なんでだー＞＜)。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/is
``` js
const obj1 = {foo: "bar"}
const obj2 = {foo: "bar"}

console.log(Object.is(obj1, obj2)) // false
```

## Redux

### enhancer とは...
まず、createStore関数は
> createStore(reducer, [preloadedState], [enhancer])

第三引数または第二引数に、enhancerという関数が渡ってくることを想定している。
そして、このenhancerとは[Store enhancer](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer)のことである。`Store enhancer`は、[Store creater](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-creator)を新しく拡張して構成した`Store creater`を返す **[高階関数](https://ja.wikipedia.org/wiki/%E9%AB%98%E9%9A%8E%E9%96%A2%E6%95%B0)** のこと。

> 高階関数とは、単に関数を引数にとったり戻り値にしているような関数のこと。

### compose
[compose](https://github.com/reactjs/redux/blob/master/docs/api/compose.md)関数は、関数を複数引数にとり、それらの関数の戻り値を右から左へと順々に渡した新しい関数を返します。
``` js
const a = arg => {
    //...
    return aSomething
}
const b = arg => {
    //...
    return bSomething
}

const composed = compose(a, b)

// const composed = arg => {
//     return a(b(arg))
// }

```
Reduxでは、複数のStore enhancerを用いたい場合にcomposeを用います。

そして、`applyMiddleware`もStore enhancerです。applyMiddlewareだけを用いる場合はcomposeを使う必要はないですが、例えばもう一つの有名なStore enhancerの`redux-devtools`も合わせて使いたい場合は以下のようにcomposeを使う必要があります。

``` js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './containers/DevTools'
import reducer from '../reducers'

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)

const store = createStore(
  reducer,
  enhancer
)
```

---

# 参考
## React
* [React公式](https://reactjs.org)
  * [公式チュートリアル](https://reactjs.org/tutorial/tutorial.html)
  * [JSX記法のドキュメント](https://reactjs.org/docs/jsx-in-depth.html)
  * [Reactを用いた設計の考え方](https://reactjs.org/docs/thinking-in-react.html)
  * [Reactに関する語集](https://reactjs.org/docs/glossary.html)

* [reactjs_koans(チュートリアル)](https://github.com/arkency/reactjs_koans)

## ES6
### ES6とは?
* [ES6入門](https://qiita.com/soarflat/items/b251caf9cb59b72beb9b)
* [ES6入門まとめ](https://qiita.com/To_BB/items/0574892896212f34960e)
* [ES2015で始めるJavaScript入門](https://qiita.com/abcang/items/824681cb88676da4f9a8)

### StyleGuide
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

### ES6に関する構文
* [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters)
* [Spread syntax(stage-3)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
* [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Redux
* [Redux公式](https://redux.js.org)
  * [Redux とは](https://redux.js.org)
  * [Actionとは](https://redux.js.org/docs/basics/Actions.html)
  * [Reducerとは](https://redux.js.org/docs/basics/Reducers.html)
  * [Storeとは](https://redux.js.org/docs/basics/Store.html)
  * [Reducersのひな形](https://redux.js.org/docs/recipes/ReducingBoilerplate.html)

### Redux with React
* [プレゼンテーションコンポーネントとコンテナコンポーネントについて](https://qiita.com/tuttieee/items/a3ca7d9d415049d02d60)
* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [Reactと使う](https://redux.js.org/docs/basics/UsageWithReact.html)

## Github
* [Redux](https://github.com/reactjs/redux)

## その他参考にした資料
* [React.js 実戦投入への道](https://qiita.com/icoxfog417/items/5d79b3336226aa51e30d)
* [Periodic table of HTML elements](https://madebymike.com.au/demos/html5-periodic-table/)
* [reduxのcomposeとapplyMiddlewareとenhancer](https://qiita.com/pirosikick/items/d7f9e5e197a2e8aad62f)
