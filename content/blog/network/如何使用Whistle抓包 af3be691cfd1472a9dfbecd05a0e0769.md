---
title : "如何使用Whistle抓包"
date: 2021-07-16
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
categories : [                              
"架构","微前端",
]
toc: true
tags: [
"前端安全",
]
---

xss & csrf 都是窃token cookie之类的敏感信息

 <!--more-->
[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

# 如何使用Whistle抓包

> 抓包工具

[关于whistle](https://wproxy.org/whistle/)

📖

---

---

# 安装whistle

```bash
npm install -g whistle
```

# 安装 Chrome 插件SwitchyOmega

### 配置

![%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Whistle%E6%8A%93%E5%8C%85%20af3be691cfd1472a9dfbecd05a0e0769/Untitled.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Whistle%E6%8A%93%E5%8C%85%20af3be691cfd1472a9dfbecd05a0e0769/Untitled.png)

### 启动

![%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Whistle%E6%8A%93%E5%8C%85%20af3be691cfd1472a9dfbecd05a0e0769/Untitled%201.png](%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Whistle%E6%8A%93%E5%8C%85%20af3be691cfd1472a9dfbecd05a0e0769/Untitled%201.png)

reqMerge

[reqMerge](http://wproxy.org/whistle/rules/reqMerge.html)

修改表单请求的内容，包括普通的表单、上传表单及请求类型为JSON的内容(Content-Type: application/json)

```jsx
www.test.com/cgi-bin/get-data reqMerge://(a=1&b=2)
```

w2 run
