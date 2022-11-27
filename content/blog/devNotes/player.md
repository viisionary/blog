---
title : mpegts

date: 2022-11-16

tags: ["Web Media"]

categories : ["Web Media"]

---

mpegts.js 的工作原理是将 MPEG2-TS 流转换为 ISO BMFF（分段 MP4）片段，然后通过Media Source Extensions API将 mp4 片段输入 HTML5<video>元素。