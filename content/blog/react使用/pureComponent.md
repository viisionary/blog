---
title : PureComponent 纯组件
date: 2021-07-22
tags: ["react"]
---

为什么要使用shouldComponentUpdate？什么时候使用React.PureComponent
re render的情况

<!--more-->

作用 Avoid Reconciliation

```js
function shouldComponentUpdate(nextProps, nextState) {
return true;
}
```
组件render也会引起子组件render 虽然有diff 即使 React 只更新更改的 DOM 节点，重新渲染仍然需要一些时间。
延迟不明显就不用管

当确定知晓子组件不需要render 就可以自定义
shouldComponentUpdate
大多数情况下，您可以使用React.PureComponent而不是编写自己的shouldComponentUpdate

它只进行浅层比较，因此如果 props 或 state 可能以浅层比较会错过的方式发生变异，则不能使用它。

纯粹的组件 要是props或state很深

props.theme.color 改变  CounterButton不会re render
props.color 改变 会 re render
props.color 不变 不会 re render

使用React.Component的话 父组件re render 了 props.color不变 都会

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}

```

props.theme.color 改变  CounterButton不会re render
要想触发改变就用新生成的对象
concat。扩展运算符。Object.assign。等等，

