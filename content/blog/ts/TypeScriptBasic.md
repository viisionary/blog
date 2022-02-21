---
title : TypeScript 基础类型
date: 2021-07-16
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
categories : [                              
"架构","微前端",
]
toc: true
tags: [
"前端安全",
]
---

Basic Type、Interfaces

 <!--more-->
[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

# TypeScript Basic

### 一、Basic Types【4 点】

> boolean, bigint, null, number, string, symbol, object, and undefined

```tsx
/*
1、       
Basic Types   
声明一个变量时可规定多种类型   
*/
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

/*
2、      
Interfaces
规定一个 object【包括其 props】 的类型
*/
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
	
/*
3、
Classes        
规定类的私有属性、static 属性
*/
class UserAccount {
  name: string;
  id: number;

	static owner:string;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
UserAccount.owner:string = 'ali';     // 初始化静态变量

/*
4.
定义抽象方法&实现
*/
interface StringValidator {
  isAcceptable(s: string): boolean;
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

### 二、enums【枚举】

```tsx
// 定义
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
// 可赋值
enum UserResponse {
  No = 0,
  Yes = 1,
}
// 可为计算结果
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}
```

### 三、Union enums and enum member types【枚举用在类型声明的属性中】

```tsx
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;// 
  radius: number;
}
```

### 四、function【参数&返回值】

```tsx
function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}

// 组合的参数
function getLength(obj: string | string[]) {
  return obj.length;
}

// 剪头函数声明
let fst: <T, U>(a: T, b: U) => T = (a, b) => a;
```

### 五、Generics【泛型】

```tsx

type StringArray = Array<string>;

type NumberArray = Array<number>;

type ObjectWithNameArray = Array<{ name: string }>;

//type 是个动态的；
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
```

### Utility Types【规定一下读取】& type transformations【动态的改变类型】

```tsx
// 普通的
Partial<Type>

// => 只读

Readonly<Type>

// key & value 组合
Record<Keys,Type>;

interface PageInfo {
  title : string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title : "about" },
  contact: { title : "contact" },
  home: { title : "home" },
};

// 选取部分
Pick<Type, Keys>

// 去掉
Omit<Type, Keys>
Exclude<Type, ExcludedUnion>

// 去掉空
NonNullable<Type>
```

```tsx
//规定函数参数的类型
Parameters<Type>;

declare function f1(arg: { a: number; b: string }): void;

type T3 = Parameters<typeof f1>;
//    ^ = type T3 = [arg: {
//        a: number;
//        b: string;
//    }]

// 返回值类型
ReturnType<Type>

type T4 = ReturnType<typeof f1>;
//    ^ = type T4 = {
//        a: number;
//        b: string;
//    }
```

```tsx
// class => type
InstanceType<Type>
// 必填
Required<Type>
```

```tsx
const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
    };
```
