---
title : WebRTC 
date: 2021-07-22 
tags: ["WebRTC","webMedia"]
---

WebRTC的总结

<!--more-->

## 兼容性

### 屏幕共享

该功能目前支持chrome以及火狐浏览器,chrome 72版本以下需下载插件,chrome 72版及72 以上和Firefox不需要,包括了多路推流

## 可用的 stun 服务

```typescript
export const iceServers = [
{ url: 'stun:stun.l.google.com:19302' },
{ url: 'stun:stun.voipbuster.com' },
{ url: 'stun:stun.voipstunt.com' },
{ url: 'stun:stun-eu.3cx.com:3478' },
```

## code流程

多对多连麦

用户创建会议-> 显示自己的画面【推流】

其他用户加入会议-> websocket通知已在会用户-> 该用户通过call新入会用户-> 新入会用户回call-> 建立链接

显示新用户画面

```typescript
import Peer from 'peerjs';
import React, {useEffect, useRef} from 'react';

const peer = useRef<any>(null);

const ws = useRef<any>(null);

navigator.mediaDevices &&
navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    }).then((stream: MediaStream) => {
    // 取到摄像头的流

    // TODO 渲染 VIDEO 暂时自己的画面

    // ws 发送自己加入房间的消息
    ws.current.emit('join-room', roomId, myUserId);

    ws.current.on('user-list', (list: any) => {
        // 收到已在房间的用户列表
        setBeforeUserVideos(list);
    });
    ws.current.on('user-connected', (userId: string) => {
        // ws有新用户接入, peer 去 call 新用户
        const call = peer.current.call(userId, stream);
        call && call.on('stream', (remoteStream: any) => { /* TODO 创建新播放器*/})
        call && call.on('close', () => {/* TODO 移除该用户窗口*/})
    })

    ws.current.on('user-disconnected', (userId: string) => {
        // 用户从房间退出
    });
  
    const peerConfig: any = {
        id: myUserId,
        config: {
            iceServers,
        } 
    };
    peer.current = new Peer(myUserId, peerConfig);

    peer.current.on('call', (call: any) => {
        // 连接接入时
        call.on('stream', function (remoteStream: any) {
            // TODO new video 展示接入用户的画面
        });
        // 连接关闭时
        call.on('close', () => {
            // TODO rm  video
        });
    });

})
```

可以输入流

call 用户时通过id确定用户；

要使用服务器

stun turn ice

nat内网穿透

## TODO

### 基础直播

一方推流、多方拉流、控制音视频输入

#### 自适应码率

#### 手动选择码率

#### 混音【多路】

音视频混流、写入掌声、笑声、画面等等

#### 混流

多路混一路

### 会议[连麦]

多用户可加入会议
创建人可控制参会人连麦/视频状态

### 推视频

选择视频文件直播

### 共享屏幕

### 截图录像

### 互动白板

### 文件共享

## 原生 RTC 能力

RTCPeerConnection

js

请求与服务建立通道

```js
const pc = new RTCPeerConnection();

const offerOptions = {
    offerToReceiveVideo: 1,
    offerToReceiveAudio: 1
};
await pc.createOffer(offerOptions);

// 客户端回答

var localDesc = new RTCSessionDescription({"type": "offer", "sdp": offerSdp});

await pc.setLocalDescription(localDesc);

var remoteDesc = new RTCSessionDescription({"type": "answer", "sdp": channel_sdp});
await pc.setRemoteDescription(remoteDesc);



//播放

// 监听Peer链接

function gotRemoteStream(e) {
    let track = e.streams[0].getTracks();
    if (track[0].kind == "video") {
        remoteVideoStream = e.streams[0];
    } else {
        remoteAudioStream = e.streams[0];
    }
}

// 音轨& 视频轨道建立
pc.addEventListener('track', gotRemoteStream);

pc.onconnectionstatechange = function (event) {
}
pc.oniceconnectionstatechange = function (event) {
}
``` 

### SDP协议
允许丢包的 UDP 协议

## NAT

## ICE
webRTC 中使用 ICE 去实现 NAT 穿透

框架 整合了 TURN & STUN

## STUN、

NAT的 UDP 简单穿越

## TURN 中转服务器

stun无法打通可用 TURN

媒体协商：sdp
网络协商：candidate


对称形网络：需要 TURN 服务器中转
非对称形网络