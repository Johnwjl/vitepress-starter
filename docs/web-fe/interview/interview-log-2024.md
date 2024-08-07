# 前端开发面试题及解答

（2024年参加的所有线上线下前端面试的复盘汇总，持续更新中...）

## JS 篇

### JS中有几种 `this` 指向以及有几种改变 `this` 指向的方式？

1. 全局上下文中的 `this` :
   • 在全局范围内（非严格模式）， `this` 指向全局对象（在浏览器中是 `window` ，在 Node.js 中是 `global` ）。

   ```js
   console.log(this); // 在浏览器中输出 window
   ```

   • 在严格模式下，`this` 为 `undefined` 。

2. 函数调用中的 `this` :
   • 普通函数调用: 在非严格模式下， `this` 指向全局对象；在严格模式下， `this` 为 `undefined` 。

    ```js
    function show() {
        console.log(this);
    }
    show(); // 非严格模式下输出 window，严格模式下输出 undefined
    ```

   • 方法调用: 当函数作为对象的方法被调用时， `this` 指向调用该方法的对象。

    ```js
    const obj = {
        name: "John",
        show: function() {
            console.log(this.name);
        }
    };
    obj.show(); // 输出 "John"
    ```

3. 构造函数中的 `this` :
   • 当函数以 `new` 关键字调用时， `this` 指向新创建的对象实例。

    ```js
    function Person(name) {
        this.name = name;
    }
    const person = new Person("John");
    console.log(person.name); // 输出 "John"
    ```

4. 箭头函数中的 `this` :
   • 箭头函数没有自己的 `this` 。它会捕获定义时的 `this` 值，这通常是外部函数的 `this` 。

    ```js
    const obj = {
        name: "John",
        show: () => {
            console.log(this.name);
        }
    };
    obj.show(); // 输出 "John"
    ```

5. `call` 和 `apply` 方法:
   • `call` 和 `apply` 方法可以显式地设置函数内部的 `this` 。它们允许你指定函数的 `this` 值并立即调用它。

    ```js
    function show() {
        console.log(this.name);
    }
    const obj = {
        name: "John"
    };
    show.call(obj); // 输出 "John"
    ```

   • `call` 方法接收参数列表，而 `apply` 方法接收一个参数数组。

    ```js
    function show(name) {
        console.log(this.name + " " + name);
    }
    const obj = {
        name: "John"
    };
    show.apply(obj, ["Mary"]); // 输出 "John Mary"
    ```

6. `bind` 方法:
   • `bind` 方法创建一个新函数，这个新函数在调用时 `this` 被绑定到提供的值。`bind` 不会立即执行函数，而是返回一个新函数。

    ```js
    function show(name) {
        console.log(this.name + " " + name);
    }
    const obj = {
        name: "John"
    };
    const boundShow = show.bind(obj, "Mary");
    boundShow(); // 输出 "John Mary"
    ```

### JS原型链

- 原型链：每个对象拥有一个原型对象，对象从原型继承方法和属性，原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推，直到一个对象的原型对象为`null`。这种关系常被称为原型链 (prototype chain)
- 这些属性和方法定义在 Object 的 `构造器函数` (constructor functions) 之上的 `prototype` 属性上，而非对象实例本身。
- 从构造函数的·prototype·属性派生出`__proto__`属性，它是`对象实例`和它的`构造器`之间建立的链接,作用是将原型中的所有属性和方法都被复制到实例中
-  实例的 `__proto__` == constructor 的 `prototype` 属性
-  当访问实例(对象)的一个属性时，会先查找实例本身是否有这个属性，如果没有，就从实例的 `__proto__`中查找这个属性 (也就是 constructor 的 prototype)
-  继承的属性和方法是定义在`prototype`属性之上的。
-  构造器是函数也是对象类型
-  每个实例对象（object）都有一个私有属性（称之为 `__proto__`）指向它的构造函数的原型对象（prototype）。
-  参考
   - [对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)
   - [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
   - [Vue3 面向对象编程](https://juejin.cn/post/7039252967374979103)
   - [从函数式编程和面向对象的思考到Vue3的函数式编程](https://blog.csdn.net/qq_21561833/article/details/118969397)

1. 原型链：
   • 每个 JavaScript 对象（包括函数）都有一个 `prototype` 属性，它指向一个对象（称为原型对象）。

    ```js
    function Person() {}
    const person = new Person();
    console.log(person.__proto__ === Person.prototype); // 输出 true
    ```

   • 当访问一个对象的属性时，如果对象本身没有这个属性， JavaScript 引擎会在它的 `prototype` 链上查找。

    ```js
    function Person() {}
    Person.prototype.name = "John";
    const person = new Person();
    console.log(person.name); // 输出 "John"
    ```

2. 原型链的作用：
   • 继承：通过原型链，你可以在不修改现有代码的情况下，通过扩展原型来实现继承。

    ```js
    function Person() {}
    Person.prototype.name = "John";
    function Student() {}
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.age = 18;
    const student = new Student();
    console.log(student.name); // 输出 "John"
    console.log(student.age); // 输出 18
    ```

   • 封装：通过原型链，你可以将公共属性和方法封装在原型对象中，然后在多个对象中共享它们。

    ```js
    function Person() {}
    Person.prototype.getName = function() {
        return this.name;
    };
    const person1 = new Person();
    person1.name = "John";
    const person2 = new Person();
    person2.name = "Mary";
    console.log(person1.getName()); // 输出 "John"
    console.log(person2.getName()); // 输出 "Mary"
    ```

3. 原型链的缺点：
   • 继承关系不透明：当你修改原型对象时，所有继承自该原型的对象都会受到影响。

    ```js
    function Person() {}
    Person.prototype.name = "John";
    function Student() {}
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.age = 18;
    const student = new Student();
    Person.prototype.name = "Mary";
    console.log(student.name); // 输出 "Mary"
    ```

   • 引用类型共享：当你修改原型对象中的引用类型属性时，所有继承自该原型的对象都会受到影响。

    ```js
    function Person() {}
    Person.prototype.friends = ["John", "Mary"];
    const person1 = new Person();
    const person2 = new Person();
    person1.friends.push("Bob");
    console.log(person2.friends); // 输出 ["John", "Mary", "Bob"]
    ```

#### 实现继承的方式有哪些

- 原型链继承
- 构造函数继承
- 组合式继承
- 寄生组合式继承
- Object.create()
- ES6 Class extends
- 参考
  - [javascript实现继承的七种方式](https://juejin.cn/post/6844904161071333384)
  - [彻底弄清js继承的几种实现方式](https://segmentfault.com/a/1190000022677985)

### 闭包

#### 什么是闭包

- 闭包是指：函数内部的嵌套函数及包裹它的作用域上下文。

#### 闭包的作用

- 访问函数内部作用域的变量

#### 闭包的应用场景

- 防抖和节流（Debounce & Throttle）
  - 防抖（Debounce）： 一段时间后才执行，避免短时间内频繁触发。
  
  ```js
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
    }

    const debouncedFn = debounce(() => console.log('Debounced!'), 200);
    window.addEventListener('resize', debouncedFn);
  ```

  - 节流（Throttle）： 一段时间内只执行一次，避免短时间内频繁触发。

  ```js
    function throttle(fn, delay) {
        let timer;
        return function(...args) {
            if (!timer) {
                timer = setTimeout(() => {
                    fn(...args);
                    timer = null;
                }, delay);
            }
        };
    }

    const throttledFn = throttle(() => console.log('Throttled!'), 200);
    window.addEventListener('scroll', throttledFn);
  ```

- 函数的柯里化是闭包的一个主要应用场景。

#### 函数的柯里化（currying）

概念：将一个多参数的函数变为一个 one-argument pure function (单参数纯函数)。
作用：利于functor（函子）的复用，减少重复代码。
示例：

```js
    function makeAdder(x) {
        return function(y) {
            return x + y;
        };
    }

    var add5 = makeAdder(5);
    var add10 = makeAdder(10);

    console.log(add5(2));  // 7
    console.log(add10(2)); // 12
```

#### 闭包的问题

- 内存泄漏：由于变量未能被`垃圾回收机制`销毁而留在内存，称之为内存泄漏，这会导致性能卡顿问题甚至会造成进程崩溃。
- 如何解决：JS的垃圾回收机制是用`清除标记`的方式来释放内存，而闭包的内存占用通过`给外部执行的函数变量赋值null`来手动清除。

#### 闭包的优化

- 手动释放闭包内存占用
  - create = null // 释放对匿名函数的引用
- 匿名函数立即执行（IIFE）
- 减少全局变量声明，使用块级作用域
- 可以使用弱引用（如 WeakMap、WeakSet）来存储数据。

  ```js
    let weakMap = new WeakMap();
    (function() {
        let obj = {};
        weakMap.set(obj, 'some value');
    })(); // obj 会在作用域结束后被回收
  ```

### 深浅拷贝

#### 浅拷贝

浅拷贝是只指当```对象属性值```或者```数组项```是 ```引用类型```的时候 ，由于只拷贝了其引用，源和副本的变更是互相影响的。而深拷贝则是相互独立、互不影响的。

数组方法 `concat()`、`slice()`、对象方法 `Object.assign()`、扩展运算符`...`、`Array.from()`、`Object.create()` 都属于浅拷贝

#### 局限的深拷贝

- `JSON`方式:`JSON.parse(JSON.stringify(obj))`
  - 缺点：它是一种有限的深拷贝，仅适用于纯 JSON 数据结构。在需要处理复杂对象结构或保留特定数据类型时，它不是一个合适的选择。

- 递归地拷贝对象的自身属性，从而生成一个新对象。

    ```js
    function deepClone(obj) {
        var target = {};
        for(var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (typeof obj[key] === 'object') {
                    target[key] = deepClone(obj[key]); 
                } else {
                    target[key] = obj[key];
                }
            }
        }
        return target;
    }
    ```

  - 它只处理了对象属性是对象的情况，而没有处理数组、日期、正则表达式、函数、以及循环引用等复杂情况。

#### 手写深拷贝

通过递归来实现，遍历对象的每一个属性，并根据属性类型进行拷贝。

```js
function deepClone(obj, hash = new WeakMap()) {
  // 如果是 null 或 undefined 或非对象类型，则直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 如果是 Date 对象，则返回一个新的 Date 对象
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 如果是 RegExp 对象，则返回一个新的 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 防止循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理对象和数组
  let cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);

  // 遍历对象属性并递归拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}

// 测试
const original = {
  name: 'John',
  age: 30,
  details: {
    hobbies: ['reading', 'traveling'],
    address: {
      city: 'New York',
      zip: '10001'
    }
  }
};

const clone = deepClone(original);
console.log(clone);
console.log(clone.details === original.details); // false
```

## ES6 篇

### Let 与 Const

#### JS有哪些作用域

- 词法作用域：作用域确定于其书写定义的阶段，而非代码执行的阶段。
- JS变量遵循词法作用域，包含 全局、函数、块级

#### let const 与 var 的区别

- let const 是块级作用域
- var 变量会被提升到顶部并进行初始化，而 let const 声明前变量不可用（暂时性死区）
- let const 不能重复声明，const 不能重新赋值 且必须在声明时初始化

#### const 常量真的不可以修改吗，如果我想修改要怎么做?

`const`用于声明一个只读的常量。`const` 仅保证变量名绑定的引用不变。如果 `const` 声明的变量是一个对象或数组，其内部的属性或元素是可以改变的。

#### 如何使 const 引用类型变量内部也不可修改？

- 使用`Object.freeze(obj)`冻结对象，就能使其内部的属性不可变，结合使用`递归`等方式一层一层全部冻结。

### 解构赋值

### 模版字符串

### 展开运算符

### 箭头函数

### promise

#### promise 有几种状态

- `pending` `fullfill` `reject`

#### `promise.all()`的参数

- 一组`promise实例`的数组

#### async await

#### Promise内的setTimeout执行顺序是怎么样的

  ```js
    setTimeout(function () {
      console.log(1);
    }, 0);

    new Promise(function (resolve) {
      console.log(2)
      for (let i = 0; i < 10000; i++) {
        i == 9999 && resolve();
      }
      console.log(3)
    }).then(function () {
      console.log(4)
    });
    console.log(5);
    // 2 3 5 4 1
  ```

  解析：

- 首先，Promise定以后会立即执行，所以会先打印2；
- 然后，resolve和reject调用不会终止Promise内的参数函数继续执行，所以会打印3；
- 之后，Promise的then方法和setTimeout都是异步任务，会先执行完本轮“事件循环”，所以会打印5；
- 最后，由于then方法是异步里面的微任务，而setTimeout是异步的宏任务，会先打印4.

### ES6 数组方法

数组方法：`find` `findIndex` `entries` `keys` `values` `flat` `sort`

#### Array.from()

- 作用：从```类数组或可迭代对象```创建它的```浅拷贝```
- 参数：```Array.from(arrayLike, mapFn, thisArg)``` , mapFn 支持箭头函数
- 场景：```arrayLike``` 可以是 String、Set、Map 、arguments

#### new Set() 、new Map()

### 对象方法

对象方法：`assign()`(用于对象的合并 浅拷贝) `entries()` `keys()` `values()`

## Vue 篇

## TS 篇

## 后台管理篇

## 小程序篇
