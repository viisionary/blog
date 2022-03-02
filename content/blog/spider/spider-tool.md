---
title : "spider-tool"
date: 2021-07-16
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
categories : [                              
"架构","微前端",
]
toc: true
tags: [
"前端安全",
]
---

xss & csrf 都是窃token cookie之类的敏感信息

<!--more-->
[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

## 项目架构

### 源码文件夹

```bash
.
├── Gruntfile.js  
├── README.md
├── package-lock.json
├── package.json
├── spider-utils-package.json
├── src
│   ├── copyToClipboard.ts
│   ├── dateRangeGenerator.ts
│   ├── dayOfYear.ts
│   ├── deDuplicationBy.ts
│   ├── debounce.ts
│   ├── flat.ts
│   ├── getURLParameters.ts
│   ├── getWeekStartAndEnd.ts
│   ├── getWitchWeek.ts
│   ├── index.ts
│   ├── nest.ts
│   ├── onClickOutside.ts
│   ├── randomFill.ts
│   ├── renameKeys.ts
│   ├── sampleSize.ts
│   └── throttle.ts
├── test
│   └── getWitchWeek.spec.ts
└── tsconfig.json

```

### 项目文件功能 & 使用介绍

Gruntfile.js  ：grunt配置文件，

处理ts编译/Babel编译；
测试；
混淆压缩；
整理文件夹;

spider-utils-package.json是待发布的包的package；
需要手动递增version

编译完毕后
spider-utils-package.json会被cp
spider-utils中一起发布

src/ 中定义方法
test/ 中定义测试

ts将自动生成类型声明文件 
内置到spider-utils

### 待发布文件夹

```
.
├── copyToClipboard.d.ts
├── copyToClipboard.js
├── dateRangeGenerator.d.ts
├── dateRangeGenerator.js
├── dayOfYear.d.ts
├── dayOfYear.js
├── deDuplicationBy.d.ts
├── deDuplicationBy.js
├── debounce.d.ts
├── debounce.js
├── flat.d.ts
├── flat.js
├── getURLParameters.d.ts
├── getURLParameters.js
├── getWeekStartAndEnd.d.ts
├── getWeekStartAndEnd.js
├── getWitchWeek.d.ts
├── getWitchWeek.js
├── index.d.ts
├── index.js
├── nest.d.ts
├── nest.js
├── onClickOutside.d.ts
├── onClickOutside.js
├── package.json
├── randomFill.d.ts
├── randomFill.js
├── renameKeys.d.ts
├── renameKeys.js
├── sampleSize.d.ts
├── sampleSize.js
├── throttle.d.ts
└── throttle.js
```

### 通过Github Action发布到npm

```
master push 将触发 github Action

由
.github/workflows/npm-publish.yml配置

执行build和发布操作
```

# 使用

```bash
npm install --save spider-utils
```

xx.ts/xx.js

```tsx
import spiderUtils from 'spider-utils'
spiderUtils.throttle();

// 或

// 推荐 避免未使用到的包被一起引入
import throttle from 'spider-utils/throttle'

// TODO补充一下打完包的size对比
```

###### 关于npm 如何发布自己包 👇 这里

###### 关于GitHub Action 的配置👇 这里

###### 关于Grunt 👇

###### 关于Ts的使用&配置 👇

###### 关于Babel的使用👇
