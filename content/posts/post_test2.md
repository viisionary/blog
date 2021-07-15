---
title: "使用npm上发布自己的包"
date: 2021-07-13T22:27:03+08:00
---

# 使用npm上发布自己的包

```powershell
# npm 存全局的地方
/usr/local/lib/node_modules
```

# 注册一个npm账号

[npm](https://www.npmjs.com/)

# 使用终端登录

```bash
npm login
```

# 在现有项目下发布

```bash
npm publish
npm publish --access=public
```

# 首次发布之后要递增版本号

要求Git暂存区没东西

```bash
npm version patch
```
