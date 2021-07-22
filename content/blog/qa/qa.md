---
title: q&a
date: 2021-07-22
tags: ["qa"]
---
1
<!--more-->
## react
### 1. react hooks 有哪些优缺点？
> 更容易复用代码
> 
> 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
> 
>整个思想改变了 需要转换思想

### 2. useLayoutEffect 和 useEffect 区别是什么？
> useEffect在浏览器渲染完成后执行
> 
> useLayoutEffect在浏览器渲染前执行
> 
> useLayoutEffect总是比useEffect先执行 
> 
> useLayoutEffect里面的任务最好影响了Layout（布局）


3.有接触过哪些移动端跨平台框架？说下jsBridge？
4.说下react-native的原理，原生端和js端是怎么通信的？
工作中遇到过的最难的问题是什么？最后解决了吗？怎么解决的？现在觉得有没有更好的解决方案？
. 反转单向链表怎么做？需要几个指针？都有什么作用？
. Vue 和 React的区别是什么？你觉得哪个好？

### 4. redux主要解决了什么问题？它的工作原理是什么？
> 解决了组件之间通信问题,使组件和其它组件之间也可以跨层通信，不需要一层一层的把，父组件的数据往下传递。
> 
> 使用action，让action 携带新的数据值派发给store，store 把action 发给reducer 函数，reducer 函数处理新的数据然后返回给store，最后react 组件拿到更新后的数据渲染页面，达到页面更新的目的。
 
react中state有层级很深，比如a.b.c.d，如果只更新c属性有哪些办法？
```javascript
this.state.c.d[2].e=3;
this.setState(this.state);

```
### immutable.js实现的原理是什么？
如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

深拷贝对性能的消耗太大了
state 更新时，如果数据没变，你也会去做 virtual dom 的 diff ，这就产生了浪费。这种情况其实很常见
>immutable是一种持久化数据。一旦被创建就不会被修改。修改immutable对象的时候返回新的immutable。但是原数据不会改变。

使用shouldComponentUpdate可以优化性能
```javascript
var map1 = Immutable.fromJS({a:1, b:1, c:{b:{c:{d:{e:7}}}}});
var map2 = Immutable.fromJS({a:1, b:1, c:{b:{c:{d:{e:7}}}}});
Immutable.is(map1, map2);  // true
```
getIn
```javascript
const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

console.log(nested2.getIn(['a', 'b', 'd'])); // 6

```
setIn
```javascript
const { setIn } = require('immutable')
const original = { x: { y: { z: 123 }}}
setIn(original, ['x', 'y', 'z'], 456) // { x: { y: { z: 456 }}}
console.log(original) // { x: { y: { z: 123 }}}
```
. 说下crsf 和 xss，分别举例说明，各有什么解决办法？


Cookie的同源策略是怎么样的，跨域情况下如何携带Cookie
* https http 不同源
* 端口不同 不同源
* 域名不同 不同源
```javascript
// 被请求的站点
Access-Control-Allow-Origin: a.com //这里需要换成相应的发起请求的域名
Access-Control-Allow-Credentials: true
// 请求站点
xhr = new XMLHttpRequest();
xhr.withCredentials= true;  //关键句
xhr.open("GET", url);
xhr.send();
```
. 有用过哪些跨平台框架，react-native中原生端和js端怎么进行通信的？

9. 假设有一个非常复杂耗时的逻辑，代码逻辑已经最优了前提下要你优化，你有哪些办法？（这题其实是考察WebWorker）
把耗时的任务放到一个子线程里去执行，完成后通知主线程
   
10. 说下浏览器的进程、线程模型，chrome浏览器有多少个进程？线程模型中的每个线程都是干嘛用的？

11. 说下 js的内存泄漏，什么情况容易出现内存泄漏？怎么解决？垃圾回收机制是怎么样的？

12. 自己的项目做了哪些性能优化？除了webpack打包之类的优化外，http层面有做了哪些优化？gzip如何开启？gzip有多少个级别？

13. 用二分法移除掉一个字符串中所有的字母字符。

三面（现场组长面）


3. 随机生成100w正负整数存储下来，记录时间t1；然后把这100w数据中的负数全去掉，记录时间t2；然后记录总共耗时t3 = t2 - t1。

4. 在耗时t3的基础上优化下，使t4的耗时只有t3的70%; 在t4的耗时基础下再优化，使t5的耗时只有t4的70%...

5. 说一下输入一个url地址后的全过程？dom渲染那块描述过于简单，能否说的更详细点？react中的diff算法的原理？传统的diff算法是怎么实现的？

6. 说出一个react的特性？它的原理是什么？（我答的fiber）

7. 你们的前端项目主要用的是ES版本是多少？说出ES7中的3个性特性并说出应用场景？说出ES8中的三个新特性并说出应用场景？

8. WebWorker有了解过吗？它有什么应用场景？刚刚的算法题可以用这个进行再次优化吗？

9. 为什么说https是安全的？https的证书校验过程是怎么样的？（这里一定要说的非常非常详细）证书校验用到了哪些算法？
   如果服务器给客户端的消息是密文的，只有服务器和客户端才能读懂，就可以保证数据的保密性。 同时，在交换数据之前，验证一下对方的合法身份，就可以保证通信双方的安全。 （和我们平时开发中RSA加签验签，加密解密的过程比较像）。 HTTPS就是利用了类似的原理来保证通信的安全性。
   
10. https一定是安全的吗？（考察https中间人劫持），有什么解决办法？

11. 说出http2中至少三个新特性？你们有在实际中用过吗？

四面（交叉面）

交叉面和一面差不多，这里就不重复了。多问了http缓存机制问题，然后问了一下: 浏览器的默认缓存时间是多久？

五面（总监面） 

1. 自我介绍

2. 为什么要离职

3. 要你设计一个前端监控方案，你打算怎么做。

4. 平时喜欢听歌吗？用什么音乐app？（我答的以前用网易云，现在用Q音），这两个各有什么优劣势？

5. 对于你来说，你觉得做音乐app中最大的技术难点是什么？