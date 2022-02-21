---
title: 为什么要使用React.forwardRef
---
<!--more-->

## 为什么要使用React.forwardRef？

> 如果向HOC添加ref，则ref将引用最外层的容器组件，而不是包装的组件。

```jsx
// 高阶组件是一个函数，它接受一个组件并返回一个新组件。
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```
