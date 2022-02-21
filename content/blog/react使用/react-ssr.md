---
title: react 服务端渲染 & next.js使用
date: 2022-02-22
tags: ["react"]
---

一般用来做官网，方便搜索引擎爬。

<!--more-->

优点

* 网页的快速初始加载，因为准备好显示 HTML 被提供给浏览器。
* 网页的内容被更快地编入索引，从而获得更好的 SEO 排名。

缺点

* SSR 需要更多资源并且可能很昂贵，因为所有处理都在服务器上完成。
* 对于复杂的应用程序，大量的服务器请求会降低站点的速度。


### next.js

[Next.js](https://nextjs.org/)

```
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```

#### 页面

1. 静态页面

```
function About() {
  return <div>About</div>
}

export default About
```

2. 从接口获取数据后渲染页面

```
getStaticProps
```

3.从 url 获取参数调接口再渲染页面

```
getStaticPaths
```

#### 静态资源

```
import Image from 'next/image'
```

#### 路径

#### 多语言

#### 接口

#### 部署

