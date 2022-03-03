---
title : dockerDeploy
date: 2022-03-03 
tags: ["docker"]
categories : ["docker"]
---

dockerDeploy.md

<!--more-->

### 注册一个私有仓库

[参考文档](https://docs.docker.com/registry/deploying/)

```shell
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

使用局域网下 http 的仓库需要配置本机 daemon.json
[参考文档](https://docs.docker.com/registry/insecure/)

配置 daemon
```shell
vim /etc/docker/daemon.json
```

```json
{
  "insecure-registries" : ["myregistrydomain.com:5000"]
}
```
跑 docker
```shell
sudo dockerd &
```
---
### 上传
打包
```shell
docker build -t official-website .
```
打标签
```shell
docker tag official-website:latest 10.1.63.132:5000/official-website
```
提交镜像
```shell
docker push 10.1.63.132:5000/official-website
```

---
### 操作
关闭容器
```shell
docker container ls
docker stop e2013a373ca6
```
拉取或更新镜像
```shell 
docker pull localhost:5000/official-website
```
启动
```shell
docker run -p 3000:3000 localhost:5000/official-website
```
查看公钥
```shell
cat .ssh/id_rsa.pub
```

存放公钥
```shell
vim ~/.ssh/authorized_keys
```

编辑配置文件
```shell
vim /etc/ssh/sshd_config 
#pubsKey 选项打开  ~/.ssh/authorized_keys的放置路径打开
```

