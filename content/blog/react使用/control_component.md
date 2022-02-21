---
title : 关于React 中的 受控组件 vs 不受控组件
date: 2021-07-22
tags: ["react"]
categories : ["react"]
---

<!--more-->

建议使用受控组件来实现表单
在受控组件中，表单数据由 React 组件处理
input

```typescript
ReactDOM.render(<input value="hi" />, mountNode);
```

不受控组件
使用 ref从 DOM 获取表单值

```typescript
// this.input.current.value
<input type="text" ref={this.input} />
```
