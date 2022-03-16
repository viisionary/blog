title : HTTP/2相关内容
date: 2021-07-22
tags: ["https", "network"]

2. HTTP/2的优势
   （1）多路复用
   所以浏览器会限制同一个域的同时请求数，Chrome是限制6个，总连接数是17个
3. 
   所有请求都是并行下载的，而不是在队列中
   HTTP 标头被压缩
   页面以二进制而不是文本文件的形式传输，效率更高
   即使没有用户的请求，服务器也可以“推送”数据，从而提高高延迟用户的速度



需要配置 SSL
```shell
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```

再开启 http2
```shell
        listen [::]:443 ssl http2 ipv6only=on; 
        listen 443 ssl http2; 
```
