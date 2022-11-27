---
title : React中常用的type
date: 2021-07-16
categories : ["架构","微前端",]
toc: true
tags: ["ts",]
---

React中常用的type



 <!--more-->

{{< codesandbox qf7ti >}}

事件
```tsx
const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
    };
```
