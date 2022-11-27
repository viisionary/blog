---
title : "如何使用Whistle抓包"

date: 2021-07-16

tags: ["Network"]

categories: ["Network"]

---

基于Node实现的跨平台web调试代理工具，类似的工具有Windows平台上的Fiddler，主要用于查看、修改HTTP、HTTPS、Websocket的请求、响应，也可以作为HTTP代理服务器使用

 <!--more-->

## 如何使用Whistle抓包

> 抓包工具

[关于whistle](https://wproxy.org/whistle/)


## 安装whistle

```shell
npm install -g whistle
```

## 安装 Chrome 插件SwitchyOmega

### 配置

![](/blog/network/image/Untitled.png)

### 启动

![](/blog/network/image/Untitled1.png)

reqMerge

[reqMerge](http://wproxy.org/whistle/rules/reqMerge.html)

修改表单请求的内容，包括普通的表单、上传表单及请求类型为JSON的内容(Content-Type: application/json)

```jsx
www.test.com/cgi-bin/get-data reqMerge://(a=1&b=2)
```

w2 run
