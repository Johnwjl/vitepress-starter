# 在 JavaScript 中，如何控制循环的中断和跳出操作

## for 循环

- `break` : 用于完全退出当前循环。
- `continue` : 用于跳过本次迭代，继续下一次循环。
- `return` : 如果 for 循环在一个函数中，使用 return 会直接结束整个函数。

示例：

```js
// 使用 break
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break; // 跳出循环
    }
    console.log(i); // 输出 0, 1, 2
}

// 使用 continue
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue; // 跳过当前迭代
    }
    console.log(i); // 输出 0, 1, 2, 4
}
```

## for...of 和 for...in 循环

- break: 可以用来完全退出循环。
- continue: 跳过本次迭代。
- return: 如果在函数中，直接结束整个函数。

示例：

```js

const arr = [10, 20, 30, 40, 50];

// for...of 使用 break
for (const value of arr) {
    if (value === 30) {
        break; // 跳出循环
    }
    console.log(value); // 输出 10, 20
}

// for...of 使用 continue
for (const value of arr) {
    if (value === 30) {
        continue; // 跳过本次迭代
    }
    console.log(value); // 输出 10, 20, 40, 50
}
```

## forEach

- forEach 不支持直接使用 break 或 continue，但是可以通过 return 跳过本次迭代。
- 要完全退出循环，可以抛出异常，或使用替代的循环结构（如 for）。

示例：

```js

const arr = [1, 2, 3, 4, 5];

// 跳过本次迭代
arr.forEach((value) => {
    if (value === 3) {
        return; // 仅跳过当前的回调
    }
    console.log(value); // 输出 1, 2, 4, 5
});

// 模拟 break（通过抛出异常）
try {
    arr.forEach((value) => {
        if (value === 3) {
            throw new Error('Break'); // 模拟 break 效果
        }
        console.log(value); // 输出 1, 2
    });
} catch (e) {
    console.log('Loop terminated');
}
```

## map 和 filter

- map 和 filter 都是函数式方法，用于对数组进行操作。
- 它们无法通过 break 或 continue 直接控制流程，但可以通过 return 终止当前回调。

示例：

```js

const arr = [1, 2, 3, 4, 5];

// map 跳过元素
const result = arr.map((value) => {
    if (value === 3) {
        return null; // 以某种值代替当前元素
    }
    return value * 2;
});
console.log(result); // 输出 [2, 4, null, 8, 10]

// filter 跳过元素
const filtered = arr.filter((value) => {
    return value !== 3; // 仅保留不等于 3 的值
});
console.log(filtered); // 输出 [1, 2, 4, 5]
```

## 总结表格

| 循环类型 | 支持 break | 支持 continue  | 支持 return（用于函数中） | 特殊实现                   |
| -------- | ---------- | -------------- | ------------------------- | -------------------------- |
| for      | ✅          | ✅              | ✅                         | 无特殊限制                 |
| for...of | ✅          | ✅              | ✅                         | 无特殊限制                 |
| for...in | ✅          | ✅              | ✅                         | 无特殊限制                 |
| forEach  | ❌          | ❌（用 return） | ✅                         | 使用 throw 模拟 break      |
| map      | ❌          | ❌（用 return） | ✅                         | 可通过返回值跳过或修改结果 |
| filter   | ❌          | ❌              | ✅                         | 返回值 false 跳过当前元素  |

如果需要更灵活的控制，推荐使用 for 或 for...of，而不是函数式方法（如 forEach、map 和 filter）。
