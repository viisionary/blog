---
title : 计算文件md5值 
date: 2022-03-01 
tags: ["计算文件md5值"]
categories : ["计算文件md5值"]
---
分片抽取计算文件md5值.md

<!--more-->

```js
export const getFileMd5 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const stepSize = 1024 * 1024 * 10;
    const startPos = 0;
    let blob;
    if (file.webkitSlice) {
      blob = file.webkitSlice(stepSize * startPos, stepSize * (startPos + 1));
    }
    else if (file.mozSlice) {
      blob = file.mozSlice(stepSize * startPos, stepSize * (startPos + 1));
    }
    else if (file.slice) {
      blob = file.slice(stepSize * startPos, stepSize * (startPos + 1));
    }
    else {
      console.error("浏览器不支持分段读取");
      return false;
    }
    reader.onload = () => {
      // @ts-ignore
      if (reader.result) {
        const uuid = md5(reader?.result + file.name + file.size + file.lastModified);
        resolve(uuid);
      }

    };
    blob && reader.readAsArrayBuffer(blob);
  });
};
```
