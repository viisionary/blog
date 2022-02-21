---
title : "使用Hugo搭一个自己Blog"
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

Hugo 是用go编写的，支持go HTML，模板主题多且开源方便自定义

对md的渲染支持很友好，可以自定义插入的内容

[Quick Start](https://gohugo.io/getting-started/quick-start/)

## 安装

最简单的方法

```bash
brew install hugo
```

但是go被墙容易装失败

可以去go官网下载安装包安装go

再给go配置国内的代理

```bash
git clone https://github.com/gohugoio/hugo.git
cd hugo
go install --tags extended
```

这样装完没有link 去到到目录下去跑，有需求也可以加个link

然后就可以新建一个项目了

```bash
hugo new site quickstart

cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

tip: submodule 作为子模块才能push到GitHub上

## 推一个文章

```bash
hugo new posts/my-first-post.md
```

## 启动

本地实时预览

```bash
hugo server -D
```

## 配置主题

修改config.toml

```bash
theme = "ananke"
```

构建静态页面 生成在public下

```bash
hugo -D
```

## 集成到GitHub.io页面中

1. 将quickstart项目remote到一个项目
2. 开启pages功能 将pages指向 gh-pages的根目录
3. Actions中新建workflows

git 将自动生成

blog/.github/workflows/

workflows配置好后

main分支push完毕会触发构建 生成的文件在gh-pages分支

## gh-pages.yml

```bash
name: github pages

on:
  push:
    branches:
      - main  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### 配置domain

购买一个域名

在DNS配置中，新增cname类型的域名指向[github.io](http://github.io/).

在GitHub page页面添加自己的域名
