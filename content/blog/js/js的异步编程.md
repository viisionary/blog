---

title :  js异步编程
date: 2021-12-20 
description: "js的异步编程总结"
categories : [                              
"Java Script",
]
tags: [
"Java Script","异步",
]

---

Js 是单线程的

<!--more-->

## 阻塞

**当浏览器里面的一个web应用进行密集运算还没有把控制权返回给浏览器的时候，整个浏览器就像冻僵了一样，这叫做**阻塞。

解决方案1:web workers

web workers相当有用，但是他们确实也有局限。主要的一个问题是他们不能访问 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM) — 不能让一个worker直接更新UI。



## 事件循环机制

JS executes all operations on a single thread, but using a few smart data structures, it gives us the illusion of multi-threading. 

`JavaScript` 有一个**主线程 `main thread`**，和**调用栈 `call-stack`** 也称之为执行栈。**所有的任务都会放到调用栈中等待主线程来执行**。

`JavaScript` 的 `Event Loop` 是伴随着整个源码文件生命周期的，只要当前 `JavaScript` 在运行中，内部的这个循环就会不断地循环下去，去寻找 ***queue*** 里面能执行的 ***task***



Js执行时

主线程自上而下执行所有代码

同步任务直接进入到主线程被执行，而异步任务则进入到 Event Table 并注册相对应的回调函数

异步任务完成后，Event Table 会将这个函数移入 Event Queue

主线程任务执行完了以后，会从Event Queue中读取任务，进入到主线程去执行。

一直到所有任务都执行完毕

## 回调函数

```js
btn.addEventListener('click', function(){})
```

## promise

### 手写promise

### promise的链式调用

## Timeouts and intervals

- `setTimeout()`

- `setInterval()`

- `requestAnimationFrame()`在浏览器下一次重新绘制显示之前执行指定的代码块  现代版本的`setInterval()`

  当你的代码有可能比你分配的时间间隔，花费更长时间运行时，最好使用递归的 `setTimeout()` - 这将使执行之间的时间间隔保持不变，无论代码执行多长时间，你不会得到错误。

## Generator

- [`Generator.prototype.next()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next)
- [`Generator.prototype.return()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)
- [`Generator.prototype.throw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw)

## Async/Await

## 宏任务和微任务【另一个维度】

宿主（浏览器）发起的任务我们可以称之为宏观任务（macrotask）；引擎（js）自己也可以发起任务，这个任务就叫做微观任务（microtask）

<!--more-->

> 从根本上来讲js是单线程语言，首先执行的肯定是同步队列，对于异步操作只能先把它放在一边。

* 宏任务包括有：
  1. setTimeOut
  2. setInterval
  3. setImmediate【node】
  4. I/O
  5. 用户交互操作
  6. UI渲染
* 微任务包括有：
  1. Promise(重点)
  2. process.nextTick(nodejs)
  3. Object.observe(不推荐使用)

当js单线程执行完成之后就会去执行任务对列的内容。当有宏微都有的时候执行是：先执行宏观任务对列内的第一个任务，在执行全部的微观任务，在执行宏观任务对列内的第一个任务，在去执行全部微观任务。

### node

