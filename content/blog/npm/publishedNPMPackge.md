---
title : "使用npm上发布自己的包"
date: 2021-07-16
categories : [                              
"架构",
]
toc: true
tags: [
"npm",
]
---

使用npm上发布自己的包

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
