---
title : HTTP缓存控制机制 
date: 2022-03-14
tags: ["HTTP"]
categories : ["HTTP"]
---

cache.md
HTTP缓存控制机制
<!--more-->
no-cache : 协商缓存

no-store : 不缓存

### 浏览器缓存 ETag 里的值是怎么生成的
Etag 是一个文件变换就要重新生成的一个值，如果用hash来计算达不到效率
不过http也没有明确指出它的计算方式吧
不过在nginx里面，是由Last-Modified和content-length的十六进制组合而成
这样想来是个Etag加强版本的Last-Modified，毕竟Last-Modified是个时间戳，只能精确到秒

keep-alive