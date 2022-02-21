---
title : WebAssembly & assemblyscript 示例
date: 2022-02-21
tags: ["WebAssembly"]
categories : ["WebAssembly"]
---
## WebAssembly

WebAssembly 的简单介绍和assemblyscript的 hello word

[Wasm By Example](https://wasmbyexample.dev/)

[assemblyscript](https://github.com/AssemblyScript/assemblyscript)

```
<!--more-->

```

```shell
npm install -g assemblyscript
```

```ts
// This exports an add function.
// It takes in two 32-bit integer values
// And returns a 32-bit integer value.
export function add(a: i32, b: i32): i32 {
  return a + b;
}
```

编译

```shell
asc hello-world.ts -b hello-world.wasm
```
