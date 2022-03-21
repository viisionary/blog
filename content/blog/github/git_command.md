---
title: git常用命令 

date: 2022-02-21 

tags: ["Git"]

categories : ["Git"]

---


<!--more-->

## 将当前提交合并入前一个commit

重新整理commit 包括push的

git rebase -i HEAD~5

git rebase --interactive $parent_of_flawed_commit

git push -f

pick 选取

square 舍弃

### 添加一个子模块

`git add submodule https://github.com/viisionary/leetcode`

### 当前 commit 的 hash值
`git describe --always`

### 当前 tag
`git describe --contains `

## git log
%h = abbreviated commit hash
%x09 = tab (character for code 9)
%an = author name
%ad = author date (format respects --date= option)
%s = subject
### 当前作者
```
git log --pretty=format:"%an" 
```

### 格式化的 git log
```shell
git log --pretty=format:"%h%x09  %an %x09 %ad %x09 %s"
```

### git log subject
```shell
git log --pretty=format:" %s" 
```