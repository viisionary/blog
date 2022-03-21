---
title : peerDependencies

date: 2021-07-22

tags: ["npm"]

---

整理依赖树

<!--more-->


[](https://nodejs.org/es/blog/npm/peer-dependencies/)

## peerDependencies
当依赖结构是这样的时候 
会有俩副本

```shell
├── request@2.12.0
└─┬ some-other-library@1.2.3
  └── request@1.9.9
```

```json
{
  "dependencies": {
    "winston": "0.6.2",
    "winston-mail": "0.2.3"
  }
}
```
生成
```shell
├── winston@0.6.2
└─┬ winston-mail@0.2.3
  └── winston@0.5.11
```

- How do I build a **reusable** component to fit with different use cases?
- How do I build a component with a **simple API**, making it easy to use?
- How do I build an **extensible** component in terms of UI and functionality?