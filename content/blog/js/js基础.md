---
title: js基础问题
date: 2018-05-16 
description: "Sample article showcasing basic Markdown syntax and formatting for HTML
elements."
categories : [                              
"Java Script",
]
tags: [
"基础",
]
---
一些js中的一些基础问题

变量提升/this指向/指针/类型转换/迭代/模块化/promise 等
<!--more-->

## 变量提升

使用var在创建阶段就已经为变量分配了内存空间、默认值是undefined 

let & const 也会被提升 但是不会被初始化、会抛出错误

```javascript
function sayHi() {
	console.log(name);
	console.log(age);
	var name = 'Lydia';
	let age = 21;
}

sayHi();

//undefined and ReferenceError

```

setTimeout 的回调会在循环完毕之后执行 由于var的变量提升、var是全局的、每次+1，加到的是同一个变量上 若使用let/const的话 变量是局部的、每个i是个新值

```javascript
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 1);
}
//3 3 3
```

### use strict

避免声明意外的全局变量

```javascript

function getAge() {
	'use strict';
	age = 21;
	console.log(age);
}


getAge();
//ReferenceError
```

函数内部重新声明

会预先检查函数内部是否有使用的变量

```javascript

let name = 'Lydia';

function getName() {
	console.log(name);
	let name = 'Sarah';
}

getName();
//ReferenceError
```

### catch

x,y是模块的 catch中的x是error一个新变量

```javascript

(() => {
	let x, y;
	try {
		throw new Error();
	} catch (x) {
		(x = 1), (y = 2);
		console.log(x);
	}
	console.log(x);
	console.log(y);
})();
// 1 undefined 2
```

## 箭头函数

这里perimeter使用箭头函数 this指向window

```javascript

const shape = {
	radius: 10,
	diameter() {
		return this.radius * 2;
	},
	perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());

//20 and NaN 

```

## 强制类型转换

```javascript
+true;
!'Lydia';

// 1 and false

1 + '2'
// '12'
3 + 4 + '5';  // 75
```

### object 作为key会被转化为string =>

```javascript
object - "[object Object]"
undefined - "undefined"
null - "null"
```

```javascript

const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);//456
```

## 指针

```javascript

let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);
```

```javascript

let number = 0;
console.log(number++);
0
console.log(++number);
2
console.log(number);
2
```

## new Number

```javascript
new Number(3) === 3 //false

typeof new Number(3) // object
typeof 3 // number

```

## class

```javascript

class Chameleon {
	static colorChange(newColor) {
		this.newColor = newColor;
		return this.newColor;
	}

	constructor({ newColor = 'green' } = {}) {
		this.newColor = newColor;
	}
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));
//TypeError
```

### class & prototype

```javascript
class Dog {
	constructor(name) {
		this.name = name;
	}
}

Dog.prototype.bark = function () {
	console.log(`Woof I am ${this.name}`);
};

const pet = new Dog('Mara');

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

## 私有变量 ES2020

不能被外部访问

```javascript
class Counter {
	#number = 10

	increment() {
		this.#number++
	}

	getNum() {
		return this.#number
	}
}

const counter = new Counter()
counter.increment() //SyntaxError

console.log(counter.#number)
```

### 继承

构造函数内 不能在使用super()之前使用this

```javascript

class Dog {
	constructor(name) {
		this.name = name;
	}
};

class Labrador extends Dog {
	constructor(name, size) {
		super(name);
		this.size = size;
	}
}
```

执行super的时候才会执行father的构造函数

```javascript
class Bird {
	constructor() {
		console.log("I'm a bird. 🦢");
	}
}

class Flamingo extends Bird {
	constructor() {
		console.log("I'm pink. 🌸");
		super();
	}
}

const pet = new Flamingo();
```

## function实际上也是对象 可以往上挂属性

```javascript

function bark() {
	console.log('Woof!');
}

bark.animal = 'dog';
```

## 关于new

应挂到原型链上

```javascript
function Person(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function () {
	return `${this.firstName} ${this.lastName}`;
};
// 此时的函数内部的this 指向windows
console.log(Person.getFullName());
// undefined undefined

// 使this指到member上并生成一个新函数
console.log(Person.getFullName.bind(member)());
//Lydia Hallie
console.log(member.getFullName());
//TypeError
Person.prototype.getFullName = function () {
	return `${this.firstName} ${this.lastName}`;
};
console.log(member.getFullName())
// Lydia Hallie
//### new 来的对象没有prototypes

console.info(member.prototype) // undefined
console.info(Person.prototype)
//getFullName: ƒ ()
//constructor: ƒ Person(firstName, lastName)
```

### 内置对象的原型链

```javascript
String.prototype.giveLydiaPizza = () => {
	return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

name.giveLydiaPizza(); 
```

### 原型链

常规function 是有prototype的、箭头函数则没有

```javascript
function giveLydiaPizza() {
	return 'Here is pizza!';
}

const giveLydiaChocolate = () =>
	"Here's chocolate... now go hit the gym already.";

console.log(giveLydiaPizza.prototype);
console.log(giveLydiaChocolate.prototype);

// constructor: ...} undefined
```

### 关于有没有prototype

## bind & call

```javascript
const person = { name: 'Lydia' };

function sayHi(age) {
	return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```

## 模版字符串

```javascript
function getPersonInfo(one, two, three) {
	console.log(one);
	console.log(two);
	console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
//["", " is ", " years old"] "Lydia" 21
```

立即执行函数

```javascript
console.log(`${(x => x)('I love')} to program`);
//I love to program

```

## eval

Content Security Policy directive: "script-src xxx".

```javascript
const sum = eval('10*10+5');
//105
```

## storage

```javascript

sessionStorage.setItem('cool_secret', 123);
关闭tab后被移除
```

## object 的key

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
//true true false true
```

## 全局执行的function 拥有global对象和"this" keyword

## Boolean

```javascript
new Boolean(false) ? console.log(1) : console.log(2)
// 1
```

## array

### 定义

```javascript
const list = [1 + 2, 1 * 2, 1 / 2];
console.log(list);
// [3, 2, 0.5]
```

### reduce

```javascript
[[0, 1], [2, 3]].reduce(
	(acc, cur) => {
		return acc.concat(cur);
	},
	[1, 2],
);
//[1, 2, 0, 1, 2, 3]
```

### push

array.push()的返回值是当前数组长度

## setInterval

setInterval/setTimeout会返回一个唯一的id [number]

```javascript

setInterval(() => console.log('Hi'), 1000);
// 169
clearInterval(169)
// Interval会停下来
```

另一种调用方式

```javascript
setTimeout(console.log, 100, 'two');
// two
```

## generator

```javascript
function* generator(i) {
	yield i;
	yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
// 10 20
```

## 关于指针/浅拷贝/深拷贝

原本 person=>
members[0]=>
都指向[{ name: "Lydia" }]
然后person指向了null; 但是member的指向没变

```javascript

let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);
[{ name: "Lydia" }]
```

### Object.assign()

返回值和第一个参数指向一样

```javascript
const user = {
	email: "e@mail.com",
	password: "12345"
}

const updateUser = ({ email, password }) => {
	if (email) {
		Object.assign(user, { email })
	}

	if (password) {
		user.password = password
	}

	return user
}

const updatedUser = updateUser({ email: "new@email.com" })

console.log(updatedUser === user)
//true
```

Object.seal()的话就不能被assign()

## 遍历

```javascript

const myLifeSummedUp = ['☕', '💻', '🍷', '🍫'];

for (let item in myLifeSummedUp) {
	console.log(item);
}

for (let item of myLifeSummedUp) {
	console.log(item);
}
//0 1 2 3 and "☕" "💻" "🍷" "🍫"
```

## set

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
// {1, 2, 3, 4}
```

## 模块化

### es6

导入的模块是只读的：不能修改导入的模块。只有导出它们的模块才能更改其值。 当我们试图增加myCounter的值时，它会抛出一个错误：myCounter是只读的，不能修改。

```javascript
// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from './counter';

myCounter += 1;

console.log(myCounter);

//Error
```

执行顺序问题 会预分析引入的模块，所以会先执行引入的模块

```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';

console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

### export

```javascript
// module.js
export default () => 'Hello world';
export const name = 'Lydia';

// index.js
import * as data from './module';

console.log(data);
// { default: function default(), name: "Lydia" }
```

sum.default(4)

```javascript
export default function sum(x) {
	return x + x;
}

// index.js
import * as sum from './sum';
//sum.default(4)
```

## delete

```javascript

const name = 'Lydia';
age = 21;

console.log(delete name); // false
console.log(delete age); // true
```

## JSON.stringify

可以只选取部分属性

```javascript
const settings = {
	username: 'lydiahallie',
	level: 19,
	health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
//"{"level":19, "health":90}"
```

## promise & async

async返回的总是promise类型 pending是鹦鹉 Promise.resolve还没有被调用； 当data.then(res=>console.log(res));

```javascript
async function getData() {
	return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);
//Promise {<pending>}
console.info(data.then(item => {
	console.info(item);
	console.log(data);
}))
// I made it!
// Promise {<fulfilled>: "I made it!"}
```

### promise的状态  

```javascript
// TODO promise 的几个状态
```

## pure function

如果传递相同的参数，则纯函数是始终返回相同结果的函数。

## symbol

symbol是不可被枚举的、freeze的

```javascript
const info = {
	[Symbol('a')]: 'b',
};

console.log(info);
console.log(Object.keys(info));
```

## 默认值

参数上也会声明一个变量，被后面的参数所使用

```javascript
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
	console.log(num, value);
}

myFunc();
myFunc(3);
```

## 如何使Object 可以迭代 iterable

```javascript
const person = {
	name: "Lydia Hallie",
	age: 21,
	// 实际是添加一个匿名generator函数,每次调用返回value 然后自动next();
	// 所以可遍历了
	* [Symbol.iterator]() {
		yield* Object.values(this)
	}
}
console.log([...person])
```

## Object.fromEntries [array => object]

```javascript 
Object.fromEntries([['key1', 'v1'], ['key3', 'v2']],)
// {key1: "v1", key3: "v2"}
```
## if条件的执行顺序
先执行typeof randomValue  > number

!number = false

false ===string  false
```javascript
let randomValue = { name: "Lydia" }
randomValue = 23

if (!typeof randomValue === "string") {
	console.log("It's not a string!")
} else {
	console.log("Yay it's a string!")
}
```
