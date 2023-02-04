# TypeScript 学习笔记
## TS概念
- TypeScript是JavaScript的超集。
- TypeScript主要为Javascript提供了一个静态的类型系统，给JS赋予静态类型检查的能力。
- TypeScript在编辑器层面为代码提供了类型提示、代码补全和错误信息提示等能力。
## 类型系统
### 类型约束（类型注解）
#### 概念
- 为变量、函数（参数）等提供类型约束的方式。
- 注意点：
  - 声明`基础类型`之时，无需再显式添加类型注解。如：``` let str = 'abc' ``` 
  - 声明基础类型的首字母是小写的，如：`number`、`string`、`boolean`、`object` 和 `symbol`
#### 例子
- 给变量/参数添加类型类型注解
  ```ts
    // 给函数的参数加上类型注解
    function greeter(person: string) {
        return "Hello, " + person;
    }
  ```
### 一些类型
#### array
1. 例子：
   ```ts
    // 两种方式定义数组类型
    let list: number[] = [1, 2, 3]; 
    let list: Array<number> = [1, 2, 3]; // 数组泛型
   ```
#### enum（枚举）
1. 概念：枚举类型
2. 例子：
   ```ts
    // 默认情况下，从0开始为元素编号：
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green; // c = 1
    // 也可以手动的指定成员的数值,如改成从1开始编号：
    enum Color {Red = 1, Green, Blue}
    let c: Color = Color.Green; // c = 2
    // 或者，全部都采用手动赋值：
    enum Color {Red = 1, Green = 2, Blue = 4}
    let c: Color = Color.Blue; // c = 4
    // 你可以由枚举的值得到它的名字
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2]; // colorName = Green
   ```
#### tuple（元组）
1. 概念：元组类型允许表示一个已知元素`数量`和`类型`的数组，各元素的类型不必相同。
2. 例子：
   ```ts
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    // Initialize it incorrectly
    x = [10, 'hello']; // Error
   ```
#### any
1. 概念：在编程阶段还不清楚类型的变量类型。
2. 使用场景：当我们不希望类型检查器对这些值进行检查，而是直接让它们通过编译阶段的检查时。
#### unknown
1. 概念：任意类型
2. 使用场景：当需要描述一个我们还不知道其类型的变量时。
#### null和undefined
1. 使用场景：常用于联合类型的声明
2. 例子：```let str:string|null|undefined = 'abc' ```
#### void
1. 概念：void类型像是与any类型相反，它表示没有任何类型。
2. 使用场景： 当一个函数没有返回值时，你通常会见到其返回值类型是void。
3. 例子：
   ```ts
    function warnUser(): void {
        console.log("This is my warning message");
    }
   ```
#### never 
1. 概念：`never`类型表示的是那些永不存在的值的类型。
2. 使用场景（？？？）

### 类型断言
#### 概念
- 手动标记类型
#### 例子
```ts
    let strLength: number = (someValue as string).length;
```
#### 使用场景（？？？）

### 类型别名（type）
#### 概念
- 通过指定一个名称，来多次使用同一个类型
#### 例子
```ts
    type Point = {
        x: number;
        y: number;
    };
    //用类型别名来命名联合类型
    type ID = number | string;
```

### 接口（interface）
#### 概念
- 使用 `interface` 关键字声明 显式地描述 对象内部数据的类型.
#### 例子
    ```ts
    interface User {
        name: string;
        id?: number; //问号表示 可选属性
        readonly y: number; // 只读属性
    }
    const user: User = {
        name: "Hayes",
        id: 0,
        y:1 //只读属性被初始化赋值后不可修改
    };
    ```
#### 注意
- 类型检查器不会去检查属性的顺序
#### type 和 interface 区别
- type创建后不能更改
- type不能参与声明合并

### 函数类型
#### 例子
    ```ts
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }
        let mySearch: SearchFunc = function(src, sub) {
            let result = src.search(sub);
            return result > -1;
        };
    ```
#### 注意：
- 函数的形参名称不必与接口定义的参数名一致，如例子的 `source`与`src`

### 组合类型
#### 概念
- 通过组合`简单类型`来创建`复杂类型`, 组合类型有两种方式：`联合`和`泛型`。
#### 联合
#### 泛型

## 参考文献
- [TypeScript官方文档-中文文档](https://www.typescriptlang.org/zh/docs/)
- [Github上对于官方文档的中文翻译](https://github.com/zhongsp/TypeScript)
- [TypeScript官方文档-中文站](https://www.tslang.cn/docs/home.html)