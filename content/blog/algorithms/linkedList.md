---
title : "链表"
date: 2021-07-16
categories : [                              
"数据结构","算法",
]
tags : ["Java Script"]

---

使用js实现链表

<!--more-->

```javascript
export default class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
```
