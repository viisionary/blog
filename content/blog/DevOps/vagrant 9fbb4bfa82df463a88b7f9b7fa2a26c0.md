---
title: "vagrant"
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

xss & csrf 都是窃token cookie之类的敏感信息


 <!--more-->
[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

# vagrant

Finished: No
创建时间: April 8, 2021 12:39 PM

```powershell
vagrant gloabl-status #查看虚拟机状态
vagrant up a804f75 #启动虚拟机
vagrant halt a804f75 #关闭虚拟机
vagrant box list #虚拟机列表
vagrant provision a804f75 #重新加载配置
```

安装 centos7、8

```powershell
vagrant init generic/centos8
vagrant up

vagrant init centos/7
vagrant up
```

```powershell
cd ~/vagrant/boxes/centos8
vagrant up
```

```powershell
#连接
vagrant ssh
#修改密码
sudo su
sudo -i
passwd

# 可在virtual box直接进入
```

```powershell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

```powershell
regular ssh 连接
You may try edit in /etc/ssh/sshd_config
  PasswordAuthentication yes

service sshd restart

ssh [root@127.0.0.1](mailto:root@127.0.0.1) -p 2222
```

密码

zxcvbnm
