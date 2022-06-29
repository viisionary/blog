---
title : svg简述

date: 2022-06-14

tags: ["svg简述"]

categories : ["svg简述"]

---

svg简述.md

<!--more-->

## linearGradient
将渐变标签`<linearGradient>`定义在`<defs>`元素中

`<linearGradient>`的`id`属性作为其*唯一*标识，方便后面需要使用的地方对其进行引用。

`<linearGradient>`中的`<stop>`标签定义渐变色的色标，它的`offset` 和 `stop-color`属性分别定义色标的位置和颜色值，它还有一个属性`stop-opacity`，设定`stop-color`颜色的透明度。


```html
<svg>
   <defs>
       <linearGradient id="gradient-test">
           <stop offset="0%" stop-color="#DCE35B" />
           <stop offset="100%" stop-color="#45B649" />
       </linearGradient>
   </defs>
   <rect height="100" width="150" fill="url(#gradient-test)"></rect>
</svg>
```