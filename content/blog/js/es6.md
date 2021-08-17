---
title : es6 新语法 - 2019 & 2020 
date: 2021-07-22 
tags: ["js"]
---

<!--more-->

{{< codesandbox es6dexinapi-fsk69 >}}

### 2018

1. trimStart/trimEnd
2. Object.entries/Object.fromEntries
3. ...
4. [].flat
5. [].flatMap

```javascript
      // string
console.log(" trimStart() ".trimStart().trimEnd());
console.log(" trimStart() ");
// obj
const Person = {
	name: "Joey",
	age: 25
};
const entries = Object.entries(Person);
console.log(entries);
const restore = Object.fromEntries(entries);
console.log(restore);
// array
const persons = [[[Person]], { ...Person, name: "peter" }];
console.log("flat", persons.flat(), persons.flat().flat());
console.log(
	"flatMap",
	persons.flatMap((x) => {
		return [{ name: "name is" + x.name }];
	})
);
```

### 2020

1. ??
2. Promise.allSettled

```javascript
      //obj
console.log(Person.name.info?.i);
console.log(false || "true value", false ?? "true value");
console.log(NaN || "true value", NaN ?? "true value");
console.log("" || "true value", "" ?? "true value");
console.log(null || "true value", null ?? "true value");
console.log(undefined || "true value", undefined ?? "true value");
// promise
Promise.allSettled([
	Promise.resolve("ok"),
	Promise.reject("fail"),
	new Promise((resolve, reject) => setTimeout(reject, 100, "foo"))
]).then((res) => {
	console.log(res);
});

```
