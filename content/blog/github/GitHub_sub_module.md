---
title: GitHub 子模块

date: 2021-07-16

categories : ["Git","GitHub",]

toc: true

tags: ["Git",]

---

## 作用

子模块允许你将一个Git 仓库作为另一个Git 仓库的子目录。

它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

`.gitmodules` 文件保存了项目URL 与已经拉取的本地目录之间的映射，这样就能知道子模块在哪获取。

如果有多个子模块，该文件中就会有多条记录。

 <!--more-->

## hugo 中的应用

```
[submodule "themes/visiionary"]
path= themes/visiionary
url= https://github.com/visiionary/showfolio-hugo-theme.git

```
