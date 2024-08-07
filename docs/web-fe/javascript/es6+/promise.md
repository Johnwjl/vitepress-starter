# Promise

## 介绍

- `Promise` 是异步编程的一种解决方案。
- `Promise 对象`: 
  - Promise对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。
  - Promise对象是一个构造函数，用来生成Promise实例。
  - Promise对象的状态 只取决于其异步操作的结果，而不受任何外界因素影响。
  - Promise对象的状态 一旦改变后就会固定不再变(pending->fulfilled/rejected)，该结果会一直保持，此时称作 resolved（已定型）, 在Promise的回调中能够立即获取到该结果。
- 优势：
  - 比传统的解决方案——回调函数和事件——更合理和更强大。
  - 以同步方式执行异步操作，避免了层层嵌套的回调函数（回调地狱）。
  - 与事件（Event）不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
  - Promise 提供统一的 接口/API，使得控制各种不同的异步操作更加容易。
- 缺点：
  - 无法取消Promise。一旦新建它就会立即执行，无法中途取消。
  - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
  - 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 使用

- 一个Promise实例
  ```js
    const promise = new Promise(function(resolve, reject) {
        // ... some code
        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
    });
  ```
  - Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`,它们也是两个函数(由JavaScript引擎提供)。
  - resolve函数的作用是，将Promise对象的状态从`pending`变为`fulfilled`，在异步操作`成功`时调用，并将`结果`作为参数传递出去。
  - reject函数的作用是，将Promise对象的状态从`pending`变为`reject`，在异步操作`失败`时调用，并将异步操作报出的`错误`作为参数传递出去。

- 用`.then()`分别指定`fulfilled`和`rejected`的回调函数
  ```js
    promise.then(function(value) {
    // success
    }, function(error) {
    // failure
    });
  ```
  - `then`方法可以接受两个回调函数作为`可选参数`。分别是在Promise对象的状态变为`fulfilled`和`rejected`时调用。它们都接受Promise对象传出的值作为其参数。
  - `then`方法返回的是一个新的Promise实例，因此可以采用链式写法。
  - 第一个`then`回调函数完成以后，会将`返回结果`作为`参数`，传入第二个`then`回调函数。
  - 采用箭头函数，书写Promise代码可以更简洁。
  ```js
    getJSON("/post/1.json").then(
        post => getJSON(post.commentURL)
    ).then(
        comments => console.log("resolved: ", comments),
        err => console.log("rejected: ", err)
    );
  ```
- `.catch()` 捕捉发生错误时的回调函数，建议总是使用`catch`方法,而不是在`then`中定义第二个参数。
- `.finally()` 不管 Promise 对象最后状态如何，都会执行。它是与状态无关的，不依赖于 Promise 的执行结果。
- `.all()` 
  ```js
  const p = Promise.all([p1, p2, p3]);
  ```
  
  > p的状态由p1、p2、p3决定，分成两种情况: 

  > - （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

  > - （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
- `.race()` 
  ```js 
  const p = Promise.race([p1, p2, p3]);
  ```

  > 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

- `.allSettled()` 用来确定一组异步操作是否都结束了（不管成功或失败）。
  ```js
  const resolved = Promise.resolve(42);
  const rejected = Promise.reject(-1);

  const allSettledPromise = Promise.allSettled([resolved, rejected]);

  allSettledPromise.then(function (results) {
    console.log(results);
  });
  // [
  //    { status: 'fulfilled', value: 42 },
  //    { status: 'rejected', reason: -1 }
  // ]
  ```

- `.any()`
  ```js
  Promise.any([
    fetch('https://v8.dev/').then(() => 'home'),
    fetch('https://v8.dev/blog').then(() => 'blog'),
    fetch('https://v8.dev/docs').then(() => 'docs')
  ]).then((first) => {  // 只要有一个 fetch() 请求成功
    console.log(first);
  }).catch((error) => { // 所有三个 fetch() 全部请求失败
    console.log(error);
  });
  ```

  > 参数实例`只要有一个`变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；

  > 参数实例如果`所有`都变成`rejected`状态，包装实例就会变成`rejected`状态。

## 参考

- [ECMAScript 6 入门（阮一峰） - 17.Promise 对象](https://es6.ruanyifeng.com/#docs/promise)
- [MDN Web Docs - JavaScript 指南 - 使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
- [MDN Web Docs - JavaScript 标准内置对象 - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)