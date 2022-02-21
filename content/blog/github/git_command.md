---
title : git常用命令 
date: 2022-02-21
tags: ["git"]
categories : ["git"]
---
git常用命令.md

<!--more-->


### 将当前提交合并入前一个commit

重新整理commit 包括push的

git rebase -i HEAD~5

git rebase --interactive $parent_of_flawed_commit

git push -f

pick 选取

square 舍弃

### 添加一个子模块

git add submodule https://github.com/viisionary/leetcode
