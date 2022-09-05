---
title : dockerfile & docker-compse

date: 2022-09-05

tags: ["docker"]

categories : ["docker"]

---
[Dockerfile reference - 官方文档](https://docs.docker.com/engine/reference/builder/)

<!--more-->

## dockerfile
### 命令
### RUN <命令行命令> & CMD & ENTRYPOINT
<命令行命令> 等同于，在终端操作的 shell 命令。
CMD 在docker run 时运行。
RUN 是在 docker build 时运行。
ENTRYPOINT 类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。

> 注意：如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

### FROM nginx
基础镜像

### COPY &  ADD
```yaml
# [--chown=<user>:<group>]：可选参数，用户改变复制到容器内文件的拥有者和属组。
COPY [--chown=<user>:<group>] <源路径1>...  <目标路径>
```
ADD：同样需求下，官方推荐使用 COPY

### ENV & ARG
ENV 设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。

ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量。

### VOLUME
定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。
避免重要的数据，因容器重启而丢失，这是非常致命的。
避免容器不断变大。

### EXPOSE
帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射。
在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。

### WORKDIR
指定工作目录。用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（WORKDIR 指定的工作目录，必须是提前创建好的）。

docker build 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 WORKDIR 创建的目录才会一直存在。
eg:
```yaml
WORKDIR /app
```

### USER
用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。

### HEALTHCHECK
用于指定某个程序或者指令来监控 docker 容器服务的运行状态。

### ONBUILD
用于延迟构建命令的执行。 【作为别的镜像的 FROM 时】

## 构建
```shell
docker build -t project-name:v3 .
```

## Docker Compose
Compose 是用于定义和运行多容器 Docker 应用程序的工具。
通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。