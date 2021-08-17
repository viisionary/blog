---
title : package-lock.json
date: 2021-07-22
tags: ["npm"]
---

对于任何 npm 修改node_modules树或package.json. 它描述了生成的确切树，以便后续安装能够生成相同的树，而不管中间依赖项更新如何。
<!--more-->
## 用处

1. 描述依赖树的单一表示，以便保证团队成员、部署和持续集成安装完全相同的依赖关系。

2. 为用户“时间旅行”到以前的状态提供便利， node_modules而无需提交目录本身。

3. 通过可读的源代码控制差异提高树更改的可见性。

5. 通过允许 npm 跳过先前安装的包的重复元数据解析来优化安装过程。

从 npm v7 开始，锁文件包含足够的信息来获得包树的完整图片，减少读取package.json 文件的需要，并允许显着的性能改进。
npm ci

## npm ci
新的 npm ci 命令仅从您的锁定文件安装。如果你的 package.json 和你的锁文件不同步，那么它会报告一个错误。
它的工作原理是扔掉你的 node_modules 并从头开始重新创建它。

优点：除了保证您只会获得锁定文件中的内容之外，当您不从 node_modules 开始时，它也比 npm install 快得多（2x-10x！）

## npm install
仅当 package-lock.json 满足 package.json 的要求时才使用它。
如果它不满足这些要求，则更新包并覆盖包锁。
如果您希望安装失败而不是在发生这种情况时覆盖包锁定，请使用npm ci.

## 情景
1. 在 package.json 中声明一个依赖项，例如：
```json
"depA": "^1.0.0"
```
2. 然后 npm install 这将生成一个 package-lock.json ：
```json
"depA": "1.0.0"
```
3. 几天后，depA发布了一个更新的“depA”次要版本，比如“1.1.0”，那么以下内容成立：
```shell
npm ci       # respects only package-lock.json and installs 1.0.0

npm install  # also, respects the package-lock version and keeps 1.0.0 installed
# (i.e. when package-lock.json exists, it overrules package.json)
```
4. 接下来，您手动将 package.json 更新为：

```json
"depA": "^1.1.0"
```

5. 然后重新运行：

```shell
npm ci      # will try to honor package-lock which says 1.0.0
# but that does not satisfy package.json requirement of "^1.1.0"
# so it would throw an error

npm install # installs "1.1.0" (as required by the updated package.json)
# also rewrites package-lock.json version to "1.1.0"
# (i.e. when package.json is modified, it overrules the package-lock.json)
```
