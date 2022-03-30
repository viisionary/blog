---
title: react 服务端渲染 & next.js使用
date: 2022-02-22
tags: ["react","ssr"]
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

pages/

#### 多语言

i18n
配置好语言后会有一个 locale 作为 props 在 page 中取到

#### 接口

初始化全局 axios 时 配置好 baseURL

客户端请求【render 中的请求 】走代理【初始化全局 axios 时 配置好 baseURL】
服务端直接请求

```js
config.baseURL = isBrowser() ? '/' : 'http://ip:port':
```

#### 部署

服务器上装个 docker 仓库
本地 build image
打个 tag
推到服务器仓库
在服务器上拉取 tag
docker run

查看日志
docker log

进入 container

#### SEO

添加Sitemap文件 并且向搜索引擎提交

next.js 使用如下工具自动生成

> https://github.com/iamvishnusankar/next-sitemap#readme


