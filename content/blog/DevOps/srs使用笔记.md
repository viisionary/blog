---
title : srs使用笔记

date: 2022-06-06

tags: ["srs使用笔记"]

categories : ["srs使用笔记"]

---

srs使用笔记.md

<!--more-->

Google iCloud

本地跑
```shell

CANDIDATE="192.168.1.10"
docker run --rm -it -p 1935:1935 -p 1985:1985 -p 8080:8080 \
    --env CANDIDATE=$CANDIDATE -p 8000:8000/udp \
    registry.cn-hangzhou.aliyuncs.com/ossrs/srs:4 ./objs/srs -c conf/docker.conf
```

[](https://ossrs.net/wiki/images/srs-arch4-1.png)