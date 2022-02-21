---

title : 新版本的@babel register & 编译相关
date: 2021-07-16
categories : ["架构"]
toc: true
tags: ["前端安全"]
---

babel

 <!--more-->

# 新版本的@babel/register & 编译相关 2021.7

[Babel 是什么？ · Babel 中文网](https://www.babeljs.cn/docs/)

📖

---

---

# 要安装的包

```bash
npm i @babel/register
npm i @babel/core
npm i @babel/preset-env
```

# 入口文件

```bash
require("@babel/register")({
	presets: ['@babel/preset-env']
});
require('./test.js')
```

# 入口是ts文件

```jsx
require("@babel/register")({
	presets: ["@babel/preset-typescript", '@babel/preset-env'],
});
```
