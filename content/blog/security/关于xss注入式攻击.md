---
title: "关于xss注入式攻击"
date: 2021-01-20 
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

## html中 可以被注入的写法

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>xss测试</title>
</head>

<body>
<p id="container"></p>
/** 1. href注入脚本/或直接加了a 点击的时候会执行*/
「herf时支持用户输入的时候注意」
<a href="javascript:alert(9999)">dd</a>
</body>
<script type="text/javascript">
/** 2. onError 注入脚本*/
var img = '<img src="" alt="" onError={alert("img-error")} \/>'
/** 3. 直接写入*/
const xss = `<script> alert("xss script") <\/script>`

const container = document.querySelector('#container')

/** 使用这些方法时要注意 & innerHTML */
document.write(xss)
container.outerHTML=img;
</script>
</html>
```

## react 中 使用dangerouslySetInnerHTML 渲染富文本

```jsx
<>
// 直接写标签会被react渲染成
			<p
				dangerouslySetInnerHTML={{
					__html: <img src="" alt="" onError={alert(12)} />
				}} />
// 没有进行编码过滤的可以被渲染到页面上
			<p
				dangerouslySetInnerHTML={{
					__html: '<img src="" alt="" onError={alert(12)} />'
				}} />
// 过滤之后就不是标签了，但是能以字符串的形式渲染
			<p
				dangerouslySetInnerHTML={{
					__html: validSpeVal('<img src="" alt="" onError={alert(12)} />')
				}} />
// 直接就是字符串
			{'<img src="" alt="" onError={alert(12)} />'}
		</>
```

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled.png)

## xss规则过滤

```jsx
function validSpeVal(val) {
  return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  .replace(/'/g, "&apos;").replace(/ /g, "&nbsp;");
}
```

## 一些注入手段

比较古早 一般渲染富文本的地方有戏

```html
// 用户输入 通过提前闭合标签
要是反给前端 前端还渲染了【document.write()】 就会alert
><script>alert('XSS');</script>
```

```html
<a href="javascript:alert(&#x27;XSS&#x27;)">跳转...</a>
```

```html
element内可以直接加
<img src="/static/level3/cloud1.jpg" onload="{alert(1)}">
```

```jsx
function startTimer(seconds) {
        seconds = parseInt(seconds) || 3;
        setTimeout(function() { 
          window.confirm("Time is up!");
          window.history.back();
        }, seconds * 1000);
      }

// 3
// startTimer(3)
// ')+alert(1)+('
startTimer('')+alert(1)+('');
```

```jsx
大小写绕过
<SCript></sCript>
```

能执行脚本的话可以怎么攻击？

```jsx
// 劫持流量实现恶意跳转
<script>window.location.href="http://www.baidu.com";</script>

// 窃取敏感信息 token.. cookie等等
```

等...

## 实践

### **例子：**豆瓣的搜索处理

通过search input 渲染到页面的时候 url encode，正文用Entities

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%201.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%201.png)

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%202.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%202.png)

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%203.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%203.png)

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%204.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%204.png)

前端的过滤容易被绕过，所以后端也应该处理

### **例子**：一旦用户输入或接口提交的内容直接作为标签被渲染，是十分危险的

![%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%205.png](%E5%85%B3%E4%BA%8Exss%E6%B3%A8%E5%85%A5%E5%BC%8F%E6%94%BB%E5%87%BB%20d71051ed2f464824a10f3eaa7399b05a/Untitled%205.png)

**情景：**某个hacker可以发表这个链接， 然后分享给其他已登录网站的用户 用户一旦被诱导点击 hacker就可以拿到cookie模拟该用户操作

一般 一个用户可以提交且入库【或携带脚本在url（encode之类已避免）】 ，可以对其他用户可见，触发脚本执行才OK。

## ⚠️ 注意

用户的输入&url 在渲染在页面上的时候【如：前端使用 innerHTML或dangerouslySetInnerHTML 】应过滤 或禁止输入
