---
title : webpack_plugin

date: 2022-03-18

tags: ["Webpack"]

categories : ["Webpack"]

---

Plugin - 插件是一个 ES5 类，它实现了一个应用功能并允许您挂钩到整个编译生命周期。编译器使用它来发出事件。它将新实例添加到配置对象中的插件键。

<!--more-->

## Writing a Plugin
DOC (https://webpack.js.org/contribute/writing-a-plugin/)

```js
var HelloWorldPlugin = require('hello-world');

module.exports = {
  // ... configuration settings here ...
  plugins: [new HelloWorldPlugin({ options: true })]
};
```

## How the dependency graph is sorted?
Answer: Topological Sorting

[](https://dev.to/jasmin/how-dependancy-graph-in-webpack-resolve-module-dependency-5ej4)

## webpack 制作 lib 
https://webpack.js.org/guides/author-libraries/