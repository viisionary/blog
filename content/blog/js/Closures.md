---
title: Javascript - 闭包 Closures
date: 2022-02-21
tags: ["闭包","Closures"]
categories: ["Java Script"]
---
闭包示例代码

<!--more-->

```javascript
function person() {
  let name = 'Peter';
  
  return function displayName() {
    console.log(name);
  };
}
let peter = person();
peter(); // prints 'Peter'
```

```javascript
function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}
let count = getCounter();
console.log(count());  // 0
console.log(count());  // 1
console.log(count());  // 2
```

