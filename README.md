# React-Redux Tutorial

## Start Demos
``` sh
$ npm install
$ npm run build
$ npm start
```

Then, open the http://localhost:8888

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
