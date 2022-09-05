---
title: Git 常用命令 

date: 2022-02-21 

tags: ["Git"]

categories : ["Git"]

---


<!--more-->

### 将当前提交合并入前一个commit
```shell
git commit --amend
```
### 重新整理commit 包括已push的

```shell
git rebase -i HEAD~5

git rebase --interactive $parent_of_flawed_commit

git push -f

#pick 选取

#square 舍弃
```


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
git log --pretty=format:"%an " 

git log -1 --pretty=format:'%an'
```

### 格式化的 git log
```shell
git log --pretty=format:"%h%x09  %an %x09 %ad %x09 %s"

git log --pretty=format:"%h%x09  %an %x09"
```

### 最新 tag 号
```shell
git describe --abbrev=0

```
### 最新 tag 号带 6 位 hash 值
```shell
git describe --always --abbrev=6  
```

### git log subject
```shell
git log --pretty=format:" %s" 

git log -1 --pretty=format:"%s"
```
### 移除已提交的文件
`git rm --cached -r dist`

### 提交日期
`git log -1 --pretty=format:%ad --date=format:'%Y/%m/%d %H:%M:%S'`


### 删除 tag
`git tag -d v1.0.0`
`git push origin :refs/tags/v1.0.0`

### Want to find which commit caused a bug
`git bisect start`
`git bisect bad `          # Current version is bad
`git bisect good v1.1`     # v1.1 is known to be good

`git help bisect`

### zsh 的一些常用简写 [alias]
```shell
gst - git status
gc  - git commit
gaa - git add --all
gco - git checkout
gp  - git push
gl  - git pull
gcb - git checkout -b
gm  - git merge
grb - git rebase
gpsup - git push --set-upstream origin $(current_branch)
gbda  - git branch --no-color --merged | command grep -vE "^(\+|\*|\s*(master|develop|dev)\s*$)" | command xargs -n 1 git branch -d
gfa - git fetch --all --prune
```