---
title : "双向链表"
date: 2021-07-16
categories : [                              
"数据结构","算法",
]

---

```javascript
export default class DoublyLinkedListNode {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
```
