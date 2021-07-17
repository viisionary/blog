---
title: "使用npm上发布自己的包"
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

```
# npm 存全局的地方
/usr/local/lib/node_modules
```

## 注册一个npm账号

[npm](https://www.npmjs.com/)

## 使用终端登录

```bash
 $ npm adduser
Username: your-username
Password:
Email: (this IS public) your-email
Logged in as your-username on https://registry.npmjs.org/.
```

## 在现有项目下发布

```bash
npm publish
npm publish --access=public
```

## Add README!
## Add some keywords on package.json
## 首次发布之后要递增版本号

要求Git暂存区没东西

```bash
npm version patch
```

{{ template "_internal/disqus.html" . }}
