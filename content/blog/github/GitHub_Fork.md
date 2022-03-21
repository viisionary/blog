---
title : GitHub Fork

date: 2021-07-13

categories : ["Git","GitHub",]

toc: true

tags: ["Git",]

---

📖 有时侯想要使用某个开源的代码，却发现不能完全满足自己的需求，fork就是存储库的副本。

使用fork repository可以自由的去更改GitHub上的开源项目，且保存到自己的存储库下，也能随时获取到主库的更新。

<!--more-->

## GitHub Fork

[Fork a repo DOC](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

## Fork一个存储库

在你想要fork的项目的GitHub页面

在页面的右上角，单击 Fork。


![Untitled.png](/blog/github/images/fork.png)

该fork就在自己的存储库生成了

## 新开始的项目

直接clone

```shell
git clone https://github.com/YOUR-USERNAME/Spoon-Knife
```

## 原本已经clone原始存储库

```shell
git remote -v
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

多加一个库
```shell
git remote add upstream https://github.com/octocat/Spoon-Knife.git
```

可以看到新的远程仓库已经添加

```shell
git remote -v

> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```
