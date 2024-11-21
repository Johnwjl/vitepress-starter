# 前端开发规范

(eslint 同步遵循以下配置)

- 行末无需分号
- 逗号后面使用空格
  
  ```js
    var foo = 1, bar = 2
  ```

- 代码块({})前要添加空格
  
  ```js
    if(a) {
      b()
    }

    function a() {}
  ```

- 字符串统一使用单引号的形式 `''`
- 当字符串中有变量时请使用`模版字符串`
  
  ```js
    const str = `ab${test}`
  ```

- 变量声明遵循 `最小特权原则`，尽量使用 `const` , 需要变动的则用 `let`
- 对象属性值的简写方式
  
  ```js
    const job = 'FrontEnd'

    // bad
    const item = {
        job: job
    }
    
    // good
    const item = {
        job
    }
  ```

  ```js
    // 对象属性值的简写方式要和声明式的方式分组
    const job = 'FrontEnd'
    const department = 'JDC'
    
    // bad
    const item = {
        sex: 'male',
        job,
        age: 25,
        department
    }
    
    // good
    const item = {
        job,
        department,
        sex: 'male',
        age: 25
    }
  ```

- 使用拓展运算符 `...` 拷贝数组

  ```js
    itemsCopy = [...items]
  ```

- 使用解构赋值的场景
  
  ```js
  // 当需要使用对象的多个属性时
  function getFullName (user = {}) {
    const { firstName, lastName } = user
    return `${firstName} ${lastName}`
  }
  // 当需要使用数组的多个值时
  const [first, second] = arr
  ```

- 简单数组拷贝

  ```js
    const arr3 = [...arr]
  ```

- 简单数组去重

  ```js
    const newArr = [...new Set(arr)]
  ```

- 深拷贝请使用lodash库 的 `_.cloneDeep(value)`
- 数组合并
  - 不改变原数组(合并到新数组)
  
    ```js
      const arr3 = [...arr1, ...arr2];
    ```
  
  - 改变原数组
  
    ```js
      arr1.push(...arr2);
    ```

- 使用 `includes` 替代 `或`判断逻辑

  ```js
    if(from === 'a' || from === 'b' || from === 'c'){}  // bad

    if(['a', 'b', 'c'].includes(from)) {} // good
  ```

- 更可靠的判断数据类型

  ```js
    function judgeDataType(val, type) {
      const dataType = Object.prototype.toString.call(val).slice(8,-1).toLowerCase()
      return type ? dataType === type : dataType;
    }
    console.log(judgeDataType("young")); // "string"
    console.log(judgeDataType(20190214)); // "number"
    console.log(judgeDataType(true)); // "boolean"
    console.log(judgeDataType([], "array")); // true
    console.log(judgeDataType({}, "array")); // false
  ```

- 检查是否为空对象

  ```js
    Object.keys({}).length  // 0
  ```

- 使用 `Map` 代替 `switch` 或多个 `if判断`

  ```js

    function getStatusText(status) {
      switch (status) {
          case 1:
          return '待发货';
          case 2:
          return '已发货';
          case 3:
          return '已完成';
          default:
          return '';
      }
    }

    // 使用Map替代
    const statusMap = new Map()
        .set(1, '待发货')
        .set(2, '已发货')
        .set(3, '已完成');
    // 或
    const statusMap = new Map([
      [1, '待发货'],
      [2, '已发货'],
      [3, '已完成'],
    ]); // 这种写法的内部执行的算法实际上也是循环执行set，与上面自己写set其实是一样的
    const statusText = statusMap.get(status);

    // 其实还有更简单的，直接用数组下标映射
    const statusText = ['待发货', '已发货', '已完成'][status - 1];
  ```

- 其他数组处理技巧
  - flatMap

  先在options里面添加上groupId，flatMap 会将 options 数组即
  
  ```js
  [ [{ text: '公交', value: 0, active: true, groupId: 'commute' }], ...]
  ```

  变成

  ```js
  [{ text: '公交', value: 0, active: true, groupId: 'commute' }, ...]
  ```

  ```js
    const activated = 
    optionsGroup
            .flatMap(item => 
            item.options.map(option => ({ ...option, groupId: item.groupId })))
            .filter(item => item.active);
  ```

## 注释

### Vue

- vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
- vue 文件的 data, 非常见单词要加注释
- 为每个 `prop`添加注释
- vue 文件的 methods，每个 method 必须添加注释
- store 中的 state, mutation, action 等必须加注释

### API

- 为`API`添加注释

## 参考

- [2021最新阿里代码规范（前端篇）](https://developer.aliyun.com/article/850913)
- [京东 代码规范 - 注释规范](https://guide.aotu.io/docs/html/note.html)
- [JDC 前端代码规范 - 注释规范](https://jdf2e.github.io/jdc_fe_guide/docs/html/note)
- [推荐几个大厂的前端代码规范，学会了你也能写出诗一样的代码](https://zhuanlan.zhihu.com/p/366317308)
- [基于TypeScript的JSDoc注释](https://juejin.cn/post/6844903706006126599)
- [你不知道的JSDoc](https://juejin.cn/post/7072685382323830821)
- [@use JSDoc](https://jsdoc.app/)
- [利用jsdoc为vue项目生成漂亮的文档](https://juejin.cn/post/6844903550393253895#comment)
- [docsify](https://docsify.js.org/#/zh-cn/)
- [优雅提效的高级js开发技巧（持更）](https://juejin.cn/post/7130168030604034055#heading-10)