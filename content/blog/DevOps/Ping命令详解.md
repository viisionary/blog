---
title : Ping命令详解

date: 2022-11-16

tags: ["命令"]

categories : ["Linux"]

---

Ping命令详解.md

<!--more-->

#TODO

`ping -i 3 -s 1024 -t 255 g.cn //ping主机`

> 1032 bytes from bg-in-f104.1e100.net (203.208.37.104): icmp_seq=0 ttl=243 time=62.5 ms

icmp_seq 包序号

ttl=ICMP包的转发次数（跳数）

time=时间

//-i 3 发送周期为 3秒 -s 设置发送包的大小 -t 设置TTL值为 255

TTL(Time-To-Live)指解析记录在本地DNS服务器中的缓存时间。 本地DNS服务器指用户客户端(手机、电脑等)连接Internet网络使用的DNS，默认使用的DNS是宽带运营商自动分配的DNS服务器，用户也可以将该DNS修改为公共DNS服务器，例如，114.114.114.114、8.8.8.8。


PING registry.npmjs.org (104.16.23.35): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
