---
title : WebRTC
date: 2021-07-22
tags: ["WebRTC","webMedia"]
---

WebRTC的总结

<!--more-->

#WebRTC

## 兼容性

用户创建会议-> 显示自己的画面【推流】

其他用户加入会议-> websocket通知已在会用户-> 该用户通过call新入会用户-> 新入会用户回call-> 建立链接

显示新用户画面

```javascript

navigator.mediaDevices && navigator.mediaDevices.getUserMedia()

```
可以输入流

call 用户时通过id确定用户；

要使用服务器

stun
turn
ice

nat内网穿透
