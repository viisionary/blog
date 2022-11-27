---
title : webpack中常用的 loader & 自定义 loader 

date: 2021-07-22 

tags: ["Webpack"]

---
Loaders - 它告诉 javascript 在模块中使用后如何解析非 javascript 模块。它获取资源文件并返回修改后的状态。

<!--more-->

## @svgr/webpack

可以使得 svg 文件以组件形式加载

```shell
yarn add @svgr/webpack --dev
```

```js
loader:[{
    test: /\.svg$/,
    use: ['@svgr/webpack'],
    exclude: [/asPicture/,],
}]
```

## style-loader\css-loader\sass-loader\postcss-loader

style-loader: 用于将css编译完成的样式，挂载到页面style标签上。 
需要注意loader执行顺序，style-loader放到第一位，因为loader都是从下往上执行，最后全部编译完成挂载到style上

css-loader: 用于识别.css文件, 处理css必须配合style-loader共同使用，只安装css-loader样式不会生效。

postcss-loader :用于补充css样式各种浏览器内核前缀，太方便了，不用我们手动写啦。
```shell
cnpm i style-loader -D
```

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["style-loader"]
            }
        ]
    }
}
```

## babel-loader \ ts-loader
将Es6+ 语法转换为Es5语法。
ts => js

##html-loader
我们有时候想引入一个html页面代码片段赋值给DOM元素内容使用，这时就用到html-loader
```js
import Content from "../template.html"

document.body.innerHTML = Content
```

## file-loader、url-loader

用于处理文件类型资源，如jpg，png等图片。[path]

## eslint-loader

开发/构建时代码检查