---
title : "js 代码规范 - clean code"
date: 2021-07-16
categories : ["Java Script"]
tags : ["Java Script"]
---

编写代码应该遵循的原则

<!--more-->

## 变量名
> tips
> 
> 在idea/web storm上可以开启拼写检查
> 
> 下载 Translation 插件可以实现一键翻译/转换大小写/驼峰<=>snack转换
1. 使用语义话的变量名
2. 常量使用大写去声明
3. 使用可解释的变量名

```javascript
// ❌
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);
// ✅
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

4. 避免使用模糊不清含义的变量名
5. 
## function
1. 不用添加不必要的context/上下文已经提供了的话，内部就不要重复写了
```javascript
// Bad example
function paintCar(car, color) {
	car.carColor = color; // car.color 更好
}
```

2. 参数内容较多时，最好使用es6的解构语法
3. 解构、一个function应该只做一件事情
4. 函数方法应该表述清楚该function的作用
5. 函数应该只有一个抽象级别
6. 不要写重复的代码
7. 使用Object.Assign设置对象
```javascript
// good example
const menuConfig = {
	title : "Order",
	// User did not include 'body' key
	buttonText: "Send",
	cancellable: true
};

function createMenu(config) {
	let finalConfig = Object.assign(
		{
			title : "Foo",
			body: "Bar",
			buttonText: "Baz",
			cancellable: true
		},
		config
	);
	return finalConfig
	// config now equals: {title : "Order", body: "Bar", buttonText: "Send", cancellable: true}
	// ...
}

createMenu(menuConfig);
```
8. 不要将标志用作函数参数
一个方法做一件事原则

```javascript
//Bad:

function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
//Good:

function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```

9. 避免副作用 - 避免在函数内部操作全局变量
```javascript
// Bad:

// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let name = "Ryan McDermott";

function splitIntoFirstAndLastName() {
  name = name.split(" ");
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
// Good:

function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}

const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
```
9. 避免副作用 - 避免某个操作改变输入的原数组【多处使用的时候】
重新克隆一个对象可能回对性能有所影响，但并不是大问题、
```javascript
// Bad:

	const addItemToCart = (cart, item) => {
		cart.push({ item, date: Date.now() });
	};
//Good:

	const addItemToCart = (cart, item) => {
		return [...cart, { item, date: Date.now() }];
	};
```
10. 避免污染global的方法
如果需要扩充、使用继承代替
```javascript
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
}
```
11. 封装条件语句/避免使用否定的条件/减少使用switch【使用getSomething/obj[something]代替】

```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
12. 避免使用typeof val1 === "number" 等类型检查

## 类
1. 优先使用es6的class
2. 尽量编写链式调用
3. 组合优于继承 【语义化方面】

### solid
1. 单责任原则（SRP）- 类处理的东西【对象】也应该是单一的
2. 开放/关闭原理（OCP）- 应该允许用户在不更改现有代码的情况下添加新功能
3. LISKOV替代原理（LSP）- 子类可以使用父类定义的方法且不改变其属性【即正确的封装父类】
4. 接口分离原则（ISP）- 不使用某个类中没有声明的属性
5. 依赖反演原则（DIP）
   高级模块不应依赖于低级模块。两者都应该取决于抽象。 
   抽象不应依赖于细节。细节应该取决于抽象。
> 比如： 声明了一个class 内部有个属性是从另一个方法new来。在这个class内部的一个方法内 调用了new来的对象的方法
   这样在使用new来的对象的时候就会混乱。
> 
>   更好的方法是，将要使用的方法的类封装，作为构造函数的参数传入、使之可以作为新类的一部分去调用，比较清晰条理

## 并发

使用promise，而不是回调

## error handling
使用try catch
