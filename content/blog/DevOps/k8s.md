---
title : k8s

date: 2022-05-10

tags: ["k8s"]

categories : ["k8s"]

---

k8s.md

<!--more-->

使用 Minikube 和 Katacoda 在 Kubernetes 上运行一个应用示例
> minikube
> Minikube是一种轻量化的Kubernetes集群，是Kubernetes社区为了帮助开发者和学习者能够更好学习和体验k8s功能而推出的，借助个人PC的虚拟化环境就可以实现Kubernetes的快速构建启动。目前已支持在macOS、Linux、Windows平台上利用各类本地虚拟化环境作为驱动运行。

```shell

brew install minikube 

sudo chown -R $USER $HOME/.minikube; chmod -R u+wrx $HOME/.minikube

minikube start

minikube dashboard

minikube dashboard --url
```