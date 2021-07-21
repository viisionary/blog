---
title: "react 源码阅读 - setState"
date: 2021-04-02
categories : ["react","源码"]
---

```typescript
Component.prototype.setState = function (partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

```

```typescript

function enqueueSetState(inst, payload, callback) {
    // ...
    // 存在来updatel里
    update.payload = payload;
    // 将update插入updateQueue 
    // 调度update
    enqueueUpdate(fiber, update, lane);
    scheduleUpdateOnFiber(fiber, lane, eventTime);
}

```
