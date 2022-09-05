---
title : docker部署前端完整服务

date: 2022-09-05

tags: ["docker"]

categories : ["docker"]

---

copy 源码致镜像中，安装依赖，构建代码包，配置 Nginx，启动

同个镜像根据 ENV 的不同实现不同的配置

 通过envsubst不同可以在 run 时写入环境变量到 Nginx config 中

<!--more-->
```yaml
#阶段 1 ：安装依赖
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
#更换源
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install --frozen-lockfile

  #阶段 2：构建
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

  #阶段 2：处理文件 & Nginx 配置
FROM nginx:latest AS runner
WORKDIR /app
COPY --from=builder /app/build ./middle-platform-portal

# Nginx 相关配置
RUN mkdir -p /etc/nginx/sites-enabled
RUN mkdir -p /etc/nginx/templates

COPY conf.d/nginx.conf /etc/nginx/nginx.conf
COPY conf.d/website.conf /etc/nginx/templates
ENTRYPOINT envsubst '$BACKEND' <  /etc/nginx/templates/website.conf > /etc/nginx/sites-enabled/meeting.125339.com.cn.conf && nginx -g 'daemon off;'
COPY conf.d/general.conf /etc/nginx/nginxconfig.io/
COPY conf.d/security.conf /etc/nginx/nginxconfig.io/
# 暴露端口
EXPOSE 8080

ENV PORT 8080

```