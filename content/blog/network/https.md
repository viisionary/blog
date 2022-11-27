---
title : https相关内容

date: 2021-07-22

tags: ["Network"]

categories: ["Network"]

---
https的信息

验证过程

中间人攻击

<!--more-->

## 一个站点的证书
![img.png](/blog/network/img.png)
发行者信息
![img_3.png](/blog/network/img_3.png)
公钥 签名
![img_1.png](/blog/network/img_1.png)
指纹
![img_2.png](/blog/network/img_2.png)

## https验证过程
我们在访问 https://www.youzan.com 时， 浏览器会得到一个 TLS 证书，这个数字证书用于证明我们正在访问的网站和证书的持有者是匹配的，否则因为身份认证无法通过，连接也就无法建立。
## 证书的作用
证书就是用来告诉客户端，该服务端是否是合法的，因为只有证书合法，才代表服务端身份是可信的。
## 签名是什么
一个 Certificate 由 Data 和 Signature 两部分组成。
CA会对证书进行签名，之所以要签名，是因为签名的作用可以避免中间人在获取证书时对证书内容的篡改。
## 其中 Data 包含的内容有：
证书版本号：X.509v3

序列号：一个 CA 机构内是唯一的，但不是全局唯一

签名算法：签名的计算公式为RSA(sha256(Data), IssuerPrivateKey)

签发者：DN（Distinguished Name）

有效期：证书的有效期间 [Not Before, Not After]

证书拥有者：也是一个 DN公钥长度一般是 2048bit，1024bit已经被证明不安全

扩展字段：证书所携带的域名信息会配置在 SAN 中（X509v3 Subject Alternative Name）

> Signature 位于证书最末尾，签名算法 sha256WithRSAEncryption 在 Data 域内已经指明 ，而 RSA 进行非对称加密所需的私钥（Private Key）则是由 Issuer 提供，Issuer 是一个可以签发证书的证书，由证书权威 CA 提供，CA 需要保证证书的有效性，而且 CA 的私钥需要绝密保存，一旦泄露出去，证书可能会被随意签发，也就意味 CA 机构要赔很多钱，跟保险理赔类似。

Signature = RSA(sha256(Data), IssuerPrivateKey)

## 什么是证书链（Certificate Chain）

浏览器得到 -> 请求中间证书->找到根证书 【浏览器/操作系统信任根证书】-> 信任中间证书-> 信任site.com
site.com的证书-> GlobalSign Organization Validation CA - SHA256 - G2->GlobalSign Root CA
## 什么是中间人攻击（Man-In-the-Middle-Attack）
见文尾图
中间人拦截请求，伪造服务器公钥，取到共享公钥窃取信息；

## 客户端校验服务端的数字证书的过程
1. 首先客户端会使用同样的 Hash 算法获取该证书的 Hash 值 H1； 
2. 通常浏览器和操作系统中集成了 CA 的公钥信息，浏览器收到证书后可以使用 CA 的公钥解密 Certificate Signature 内容，得到一个 Hash 值 H2 ；
3. 最后比较 H1 和 H2，如果值相同，则为可信赖的证书，否则则认为证书不可信。

## 什么是单向验证
单向验证客户浏览器即可完成，即客户端truststore存放服务器public证书，即客户端验证服务器是否可被信任。

## 双向验证和单向验证
双向验证客户浏览器需要带客户端证书到服务器端由服务器端验证，客户端trust store存放服务器端public证书，keystore存放自身private证书，服务器端truststore存放客户端public证书，keystore存放自身private证书。

## https的加密
Https加密通信有两种加密，一种是非对称加密，另一种是对称加密。

公钥只能进行加密，而解密是只能用私钥进行解密的。

非对称加密，就是加密和解密的秘钥不同

而对称加密，就是加密和解密都是用的同一个秘钥，加密和解密都很快，在不知道秘钥的情况下，想要破解的难度也非常大，比非对称加密破解还要难
## https验证阶段检查哪些内容
1. 证书是否过期，
2. 发行服务器证书的CA 是否可靠，
   em
3. 发行者证书的公钥能否正确解开服务器证书的“发行者的数字签名”，
4. 服务器证书上的域名是否和服务器的实际域名相匹配
## 为什么说https是安全的？ 
浏览器会验证证书是否可信 并且使用证书里提供的公钥生成共享密钥，对报文进行加密，这样只有服务器和客户端才能读懂，以保证数据的保密性。所以HTTPS是安全的。
## https一定是安全的吗？
因为是单向校验，只有客户端去校验服务器提供的证书是否可信，一旦客户端安装了一个根证书

## https请求建立过程 & 中间人攻击
![img_4.png](content/blog/network/img_4.pnglog/network/img_4.png)

## HTTP/2

> [HTTP2](/http2)
### 与 HTTP /1.1 的不同

This allows developers to decide which page resources will load first, every time. In HTTP/2, when a [client](https://www.cloudflare.com/learning/serverless/glossary/client-side-vs-server-side/) makes a request for a webpage, the server sends several streams of data to the client at once, instead of sending one thing after another. 

![HTTP/2 二进制分帧层](https://developers.google.com/web/fundamentals/performance/http2/images/binary_framing_layer01.svg)

### Http2 & node.js
