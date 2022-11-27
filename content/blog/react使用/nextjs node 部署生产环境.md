---
title : nextJs - node 部署生产环境

date: 2022-03-30

tags: ["nextJs","SSR"]

categories : ["nextJs","SSR"]

---

next.js node 部署生产环境

<!--more-->
## NODE 部署

> node 版本 v16.14.2
> 

```shell
# 安装依赖
yarn install
# 构建  http://10.1.63.132:8088/ 为接口地址
ADDRESS='http://10.1.63.132:8088/' yarn run build

## 复制静态资源
# official-website 目录下
cp -r ./pubilc ./.next/standalone
cp -r .next/static ./.next/standalone/.next

#打包
cd .next
tar -cvf code.tar .[!.]* standalone

# 解压
tar -xvf code.tar 

cd standalone

# 启动
nohup node server.js &
```

## standalone 结构

```shell
root@eb63132:/root/standalone>tree -L 1 -a
.
|-- .next
|-- node_modules
|-- package.json
|-- public
`-- server.js

3 directories, 2 files

root@eb63132:/root/standalone/.next>tree -L 1 -a
.
|-- BUILD_ID
|-- build-manifest.json
|-- cache
|-- package.json
|-- prerender-manifest.json
|-- react-loadable-manifest.json
|-- required-server-files.json
|-- routes-manifest.json
|-- server
`-- static

3 directories, 7 files
```
