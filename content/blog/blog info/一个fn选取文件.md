---
title : 一个fn选取文件
date: 2022-03-01 
tags: ["常用方法"]
categories : ["Java Script"]
---

一个fn调起窗口 选取文件的 promise 封装、限制文件类型&是否可多选

<!--more-->

```js
let fileInputEle: any;
const fileInputHandlerDefer: any = {};

export const pickFile = (limitTypes: any, multiple: any) => {
  if (!fileInputEle) {
    fileInputEle = document.createElement("input");
    fileInputEle.setAttribute("type", "file");
    fileInputEle.style.display = "none";
    fileInputEle.addEventListener("change", () => {
      if (fileInputEle.files && fileInputEle.files.length) {
        if (multiple) {
          fileInputHandlerDefer.resolve(fileInputEle.files);
        }
        else {
          fileInputHandlerDefer.resolve(fileInputEle.files[0]);
        }
      }
      else {
        fileInputHandlerDefer.reject();
      }
    });
  }
  fileInputEle.removeAttribute("multiple");
  fileInputEle.removeAttribute("accept");
  fileInputEle.value = "";
  if (multiple) {
    fileInputEle.setAttribute("multiple", "multiple");
  }
  if (limitTypes && limitTypes.length) {
    fileInputEle.setAttribute(
      "accept",
      limitTypes.map((one: string) => (startsWith(one, ".") ? one : `.${one}`)).join(",")
    );
  }
  return new Promise((resolve, reject) => {
    fileInputHandlerDefer.resolve = resolve;
    fileInputHandlerDefer.reject = reject;
    fileInputEle.click();
  });
};
```