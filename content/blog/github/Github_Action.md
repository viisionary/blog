---
title : Git Action

date: 2021-07-15

categories : ["Git","GitHub",]

toc: true

tags: ["Git",]

---

Action 是 github操作驱动一系列命令

使用 action 可以实现自动部署、发布

当 Git master 分支有新提交时自动发部到 npm;


 <!--more-->

## Public to npm

### 加上workflow
![24cd088b.png](/blog/github/images/24cd088b.png)

### 获取 npm accesstoken

[https://www.npmjs.com/settings/](https://www.npmjs.com/settings/) 

在npm官网中获取拥有publish权限的accesstoken

### 在该repositories中加上Actions secrets

NPM_TOKEN 名称在yml文件中将会用到
![](/blog/github/images/2e692847.png)

![](/blog/github/images/8d8ad11b.png)

## npm-publish.yml

> 当push master 时触发

配备ubuntu环境

1. npm ci 安装包
2. 运行build指令
3. 编译好的代码在spider-utils
4. 发布

```yaml
name: Node.js Package

on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm run build
      - run: |
          cd spider-utils
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

有不同依赖的命令
