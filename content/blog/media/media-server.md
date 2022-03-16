---
title: 媒体服务器 【node】 ffmpeg
date: 2021-07-22
tags: ["node","web media"]
---

媒体服务器相关

<!--more-->

```shell
brew install ffmpeg
# 转换视频文件格式
ffmpeg -i input.mp4 output.avi
```

媒体服务器            

支持obs推流

rtmp

flv

hls

对视频进行编辑      

客户端 取流进行编辑

服务器进行分发可直播

看看性能

高清 运动补偿 h265 互动

http://localhost:8000/admin/streams##

RTMP
rtmp://localhost/live/STREAM_NAME
http-flv
http://localhost:8000/live/STREAM_NAME.flv
websocket-flv
ws://localhost:8000/live/STREAM_NAME.flv
HLS
http://localhost:8000/live/STREAM_NAME/index.m3u8
DASH
http://localhost:8000/live/STREAM_NAME/index.mpd
