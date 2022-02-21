---
title: spider 一系列的设计
date: 2022-02-21
---
| Project                                                    | Desc                                                                                                |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| spider                                                     | 带有各种内容的完整框架 & 尝试性 demo                                                                |
| [spider-source ](https://github.com/viisionary/spider-source) | 脚手架的源码                                                                                        |
| spider-cli                                                 | 生成新项目的脚本 clone 的是 spider【改成[spider-source](https://github.com/viisionary/spider-source)】 |
| [spider-api](https://github.com/viisionary/spider-api)        | spider 网站的服务、有一些 demo                                                                      |
| spider-ui-cli                                              | 组件库的源码 - build 后会生成spider-vision并发布                                                    |
| spider-vision                                              | 组件库生成的 npm 包                                                                                 |
| spider-tool                                                | 工具集的源码 - build 后会生成spider-util并发布                                                      |
| spider-util                                                | 工具集生成的 npm 包                                                                                 |

```
<!--more-->
```

### [spider](https://github.com/viisionary/spider)

带有各种内容的完整框架

**TODO**

- [X] spider 的 tag 打的是 source 分支的内容 是完整的可被直接使用的框架
- [ ] spider master 是带有各种内容的 部署的网站
- [ ] spider 是基于 mui 的基础框架
- [ ] 输入框组件
  - [ ] 文本输入框
  - [ ] 文本域输入框
  - [ ] 时间、日期、时间日期选择器
  - [ ] Select
  - [ ] Radio
  - [ ] 文件上传
  - [ ] 图片上传
  - [ ] 断点续传
- [ ] 表单组件
  - [ ] create、edit
  - [ ] 前端 value 校验
  - [ ] reset、submit、cancel
- [ ] 其他组件
  - [ ] Tree 状组件
  - [ ] Tree 状多选
- [ ] DataMachine
- [ ] DataDetailMachine
- [ ] BaseModalMachine
- [ ] Snackbar
- [ ] Alert
- [ ] AuthMachine
- [ ] Theme Change
- [ ] 视频、直播player

### [spider-cli](https://github.com/viisionary/spider-cli)

生成新项目的脚本 clone 的是 spider

**TODO**

- [ ] 搞成从 tag 复制 每次搞最新/可选 版本
- [ ] 加一个以 ant-d 为模板的

### [spider-ui-cli](https://github.com/viisionary/spider-ui-cli)

组件库

发布的 npm 包叫 spider-vision

### [spider-api](https://github.com/viisionary/spider-api)

spider 网站的后台

**TODO**

- [ ] MongoDB 的免费版本链接上
- [ ] 登录注册正经的做完
- [ ] 视频处理 zoom 换背景怎么做的？
- [ ] 发起会议开房间
- [ ] FFmpeg 视频处理微服务
- [ ] 流媒体服务器

### [spider-tool](https://github.com/viisionary/spider-tool)

spider-tool 每次 push 到 master 都会直接发布 spider-util

**TODO**

- [ ] 加一个开发分支
- [ ] 合并到 master - review 之后发布新包
- [ ] 给 spider-util 写文档 存在 readme & blog 中

发布的npm包叫 spider-util
