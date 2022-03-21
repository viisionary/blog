---
title : Curry Function - 柯里化函数
date: 2021-07-16
categories : [                              
"数据结构","算法",
]

---

Currying is a process in functional programming in which we can transform a function with multiple arguments into a sequence of nesting functions. It returns a new function that expects the next argument inline.

<!--more-->

```js
function multiply(a) {
    return (b) => {
        return (c) => {
            return a * b * c
        }
    }
}
log(multiply(1)(2)(3)) // 6
```

柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)。

### 柯里化不会调用函数。它只是对函数进行转换。
```js
function curry(fn, ...args) {
    return (..._arg) => {
        return fn(...args, ..._arg);
    }
}
```

### example
```js
function discount(discount) {
    return (price) => {
        return price * discount;
    }
}
const tenPercentDiscount = discount(0.1);
tenPercentDiscount(500); // $50
// $500 - $50 = $450

const twentyPercentDiscount = discount(0.2);

twentyPercentDiscount(500); // 100
// $500 - $100 = $400
```

