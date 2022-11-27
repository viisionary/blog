---
title :  JS module 不同引入方式/暴露方式的区别
date: 2022-03-02 
tags: ["Java Script"]
categories : ["Java Script"]
---

AMD、UMD、CommonJS、ES6

<!--more-->

> AMD – one of the most ancient module systems, initially implemented by the library require.js.

> UMD – one more module system, suggested as a universal one, compatible with AMD and CommonJS.

> CommonJS – the module system created for Node.js server.

## 代码

{{< codesandbox se01wu >}}


## 在 HTML 中的使用
Modules work only via HTTP(s), not locally
```html
<!doctype html>
<script type="module">
    import {sayHi} from './say.js';

    document.body.innerHTML = sayHi('John');
</script>
```

## ES6 語法
### 重新导出
```js
export {sayHi} from './say.js'; // 重新导出 sayHi

export {default as User} from './user.js'; // 重新导出 default
```
### 动态导入
```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```
### 项目中使用注意
引入哪个模块就会执行那个模块的所有代码，所以最好不要使用统一入口

多拆模块
```javascript
// 👍🏻
import sub2_Var from "./sub/sub2";
//  webpack 等构建工具会优化 tree-shaking
import {sub1_Var} from "./module1";
// 全部打包
import module1 from "./module1";
```
### TS
@filename: animal.ts
```typescript
export type Cat = { breed: string; yearOfBirth: number };
 
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

```
@filename: app.ts
```typescript
 
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog
```
## CommonJS
module.exports  & require('')

```js
console.log(module)
// output
/* 
id: "/src/module1.js:"
exports: Object
globals: undefined
hot: Object
 */
```

## AMD
[REPO](https://github.com/requirejs/requirejs)