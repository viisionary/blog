---
title: Git Action
date: 2021-07-15
categories : [                              
"架构",
]
toc: true
tags: [
"webpack",
]
---

Emoji can be enabled in a Hugo project in a number of ways.

github操作驱动一系列命令

这里是描述

还可以写更多

 <!--more-->

## Public to npm

## 加上workflow

![Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled.png](Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled.png)

## 获取 npm accesstoken

[https://www.npmjs.com/settings/](https://www.npmjs.com/settings/) 

在npm官网中获取拥有publish权限的accesstoken

## 在该repositories中加上Actions secrets

NPM_TOKEN 名称在yml文件中将会用到

![Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled%201.png](Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled%201.png)

![Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled%202.png](Github%20Action%2062a4ecf1395640759a428b91d6ed22df/Untitled%202.png)

# npm-publish.yml

> 当push master 时触发

配备ubuntu环境

1. npm ci 安装包
2. 运行build指令
3. 编辑好的代码在spider-utils
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

package-lock.json的作用
