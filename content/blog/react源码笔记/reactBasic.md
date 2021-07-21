---
title: react & reactDOM API
date: 2021-04-02
categories : ["react","源码"]
---

react v17.0.2 概述 
react 整个项目的架构

读源码的有什么用

## react

## react-dom

### React Top-Level API

Components

1. React.Component
   使用方式

```javascript

class Welcome extends React.Component { render() { return <h1>Hello, {this.props.name}</h1>; } }

<Welcome/>
```

源码
```javascript
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

```

Component 原型链上挂着的方法
1. isReactComponent
2. setState
一旦调用setState，就将该任务金栈等待处理
```javascript
 this.updater.enqueueSetState(this, partialState, callback, 'setState');
```
3. forceUpdate 
   强制更新。 组件的状态已更改，但未调用“setState”。
*这不会调用“shouldComponentUpdate”，但会调用
*“componentWillUpdate”和“componentDidUpdate”。
   
```javascript
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
```


2. React.PureComponent
3. React.memo 

Creating React Elements
createElement().
createFactory()

Transforming Elements
cloneElement()
isValidElement()
React.Children

Fragments
React.Fragment

Refs
React.createRef
React.forwardRef

Suspense
React.lazy
React.Suspense

## Hooks >=16.8
### Basic Hooks

useState
useEffect
useContext

### Additional Hooks

useReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue
