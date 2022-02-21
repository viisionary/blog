---
title : React 中不是很常用的 Api
date: 2022-02-21
---

Fragment、Error Boundaries、componentDidCatch、Suspense、createPortal 等等

<!--more-->

## Fragment

防止破坏语义

```tsx
<Fragment>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
</Fragment>
<>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
</>
```

## Error Boundaries/componentDidCatch/Suspense

```tsx
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

```tsx
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
```

## context

使用场景

数据提供 -> component-> component-> 使用

要跨越好几层不需要该数据的组件

## ReactDOM.createPortal

门户的典型用例是父组件具有overflow: hidden或z-index样式，但您需要子组件在视觉上“脱离”其容器。例如，对话框、悬停卡和工具提示。
使用

children的事件还可以冒泡到domNode

写法在内部 实际渲染在同级
{{< codepen yzMaBd >}}


```jsx
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```
