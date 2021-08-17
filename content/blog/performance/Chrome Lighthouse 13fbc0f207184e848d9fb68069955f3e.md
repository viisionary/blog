---
title : "lighthouse"
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

Performance


 <!--more-->
[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Performance

有6个指标

lighthouse测量，也可以通过web_vitals库测量

![Chrome%20Lighthouse%2013fbc0f207184e848d9fb68069955f3e/Untitled.png](Chrome%20Lighthouse%2013fbc0f207184e848d9fb68069955f3e/Untitled.png)

## First Contentful Paint (FCP)

首个元素加载时间【eg: loading， text, image 等】

标准：最好在1.8s以内

### How to improve

eg: html应有一些loading，骨架屏，文本等内容

避免页面长时间空白

## Speed Index

表示网页内容的可见填充速度

标准：3.4s以内

### How to improve

## Largest Contentful Paint (LCP)

旧的标准是看 load/DOMContentLoaded

first contentful paint包括loading，这个显示就算

这个指标的标准是视窗中可见的最大image 或 text block的渲染时间

？基本上等于资源加载时间了

标准：最好在2.5s以内

### How to improve

1. 优化代码【css,images,fonts,js】
2. 优化关键渲染路径【屏幕上别空白，最好有骨架和loading】
3. PRPL
    1. 提前加载重要的资源
    2. 初始的路径尽快加载
    3. 提前缓存assets
    4. 懒加载其他的页面

## Time to Interactive

所有资源加载成功并能够交互的时间。

标准：3.8s内

### How to improve

最大限度地减少主线程工作
减少JavaScript执行时间

## Total Blocking Time

从看见内容到可以交互的时间

衡量从FCP到TTI之间主线程被阻塞时长的总和。

主线程执行的任务分为长任务和短任务。规定持续时间超过50ms的任务为长任务，低于50ms的任务为短任务。长任务中超过50ms的时间被认为是“阻塞”的，因此，TBT是所有长任务中阻塞时间的总和。

## Cumulative Layout Shift (CLS)累积布局偏移

主要是用户体验的问题

标准0.1内

布局抖动

### How to improve

1. 如image video这些标签都给尺寸预留位置
2. 最好不要在现有内容上方插入内容
3. 引入animations优化体验

## 整体优化方法

### 代码方面的优化

减缓高频事件的触发

react16有个fiber

减少资源大小，对资源做压缩，达到代码减重（tree shaking）这样就能在让解析的内容变小

代码拆分（code splitting），按需加载，用到这段代码才加载，这样就能防止无用的js 执行阻塞

页面避免过大的行间脚本，由于行间脚本浏览器在解析时无法做优化，所以我们必须减少行间脚本的体积写出迎合浏览器的优化代码

重复执行相同方法的代码会比每次运行不同的方法的代码更快（抽象封装的重要性），

### 资源方面优化

- **1、减少http的请求次数**
- **2、减少文件资源的请求大小**

### 构建步骤优化

webpack output进行了代码压缩

### 传输层面优化

开启gzip

## 利用http 缓存

### webpack

如：webpack在打包时候，可以监听文件是否变化，从而如果文件变化，将改变当前文件名的hash值，其余不变，如此一来，在部署升级之后，用户也只请求到变动文件，从而减少资源的下载。从而达到性能的最优。

webpack会将引用的模块打包到一起；成一个bundle；不升级不改变的话那个hash值也不改变，客户端就会使用缓存的文件

不用那么详细的配置 有些加上max-age反而不好

CACHE-CONTROL

## 如何优化打包时间

解决项目臃肿构建时间过长的问题

主要避免变重复构建node_module下手
