---
title : "tsconfig.json 属性一览 & Module 对比"
date: 2021-07-16
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
categories : [                              
"架构","微前端",
]
toc: true
tags: [
"ts",
]
---

xss & csrf 都是窃token cookie之类的敏感信息


 <!--more-->

[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

## 属性一览

### build包的时候的配置

```json
{
  "compilerOptions": {
    "target": "es5", // 定义目标语言的版本
		"module": "CommonJS", // 生成代码的模板标准
                 // 默认值 target === "es3" or "es5" ?"commonjs" : "es6"
    "esModuleInterop": true,
    "declaration": true,//生成声明文件，开启后会自动生成声明文件
//  "declarationDir": "./lib/types",// 声明文件的位置；默认与被编译的在一起
    "lib": [  //引入ts编译是用到的库
      "dom",
      "dom.iterable",
      "esnext"
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.spec.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 类型检查的时候的配置 || build成页面的配置

```json
{
  "compilerOptions": {
		"removeComments":true, // 删除注释
		"strict": true, // 开启所有严格的类型检查
		"allowJS": true, // 允许编译器编译JS，JSX文件
		"esModuleInterop": true,
		 // 允许export=导出，由import from 导入
		"noFallthroughCasesInSwitch": true, 
		// 防止switch语句贯穿(即如果没有break语句后面不会执行)
		"moduleResolution": "node", 
		// 模块解析策略，ts默认用node的解析策略，即相对的方式导入 ❕
		"noEmit": true, // 不输出文件,即编译后不会生成任何js文件
	}
}
```

## 详细

### Module

> 设置程序的模块系统。
主要涉及 import & export

1. 写法

ECMAScript 2015      SimpleModule.ts

```tsx
import m = require("mod");
export let t = m.something + 1;
```

CommonJS    Node SimpleModule.js

```jsx
var mod_1 = require("./mod");
exports.t = mod_1.something + 1;
```

2. 实际编译

ECMAScript 5 ⇒`CommonJS`

```tsx
// @filename: index.ts
import { valueOfPi } from "./constants";
export const twoPi = valueOfPi * 2;
```

```jsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twoPi = void 0;
const constants_1 = require("./constants");
exports.twoPi = constants_1.valueOfPi * 2;
```

ECMAScript 5 ⇒ ESNext = ES2020 = ES6

```tsx
import { valueOfPi } from "./constants";
export const twoPi = valueOfPi * 2;
```
