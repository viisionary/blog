---
title : React代码层优化

date: 2022-09-05

tags: ["React代码层优化"]

categories : ["React"]

---

要处理大型列表和过深的state

<!--more-->

## 避免不必要的 render

### 使用memo 

### callback

## 大型 list & tree
react-window
原理：仅通过渲染大数据集的一部分(刚好足以填充视口)来工作
style height 很重要
{{< codesandbox 3jxoig >}}

## state 过深时使用 immutable || immutability-helper

