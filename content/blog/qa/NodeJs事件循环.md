---
title : NodeJs事件循环
date: 2021-12-20
---
事件循环是 Node.js 处理非阻塞 I/O 操作的机制
<!--more-->

1. 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
2. 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
3. idle, prepare：仅系统内部使用。
4. 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
5. 检测：setImmediate() 回调函数在这里执行。
6. 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

   {{< codesandbox jsyi-bu-bian-cheng-bbrum >}}
  
/blog/js/js的异步编程/