---
title : aliplayer 源码阅读笔记
date: 2021-12-20
---
支持格式: MP4、FLV、M3U8、RTMP

阿里云Web端播放器SDK，同时支持Flash和H5两种播放技术。

<!--more-->

| 播放技术                | 视频格式             |  | 视频编码 | 音频编码 |  |
| ------------------------- | ---------------------- | -- | ---------- | ---------- | -- |
| Flash模式（已停止更新） | MP4、FLV、M3U8、RTMP |  | H.264    | AAC、MP3 |  |
| H5模式                  | MP4、FLV、M3U8       |  | H.264    |          |  |

MP4	FLV	M3U8	RTMP	MP3
HLS加密播放

* [ ] ---
![image.png](http://localhost:1313/assets/1645103285802-image.png)
aliplayer.md