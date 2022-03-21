---
title : Git Hook

date: 2022-03-18

tags: ["Git"]

categories : ["Git"]

---
本地钩子、服务器钩子、husky

<!--more-->

## 本地钩子
pre-commit prepare-commit-msg commit-msg post-commit post-checkout pre-rebase

| 钩子               | 时机                                                   | 备注                                                                     |
| -------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| pre-commit         | 在键入提交信息前运行                                   | git commit --no-verify 可以跳过 ,格式自动检查 eslint 自动检查           |
| prepare-commit-msg | 钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 | 你可以结合提交模板来使用它，动态地插入信息。                             |
| commit-msg         |                                                        | 钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 |
| post-commit        | 最后运行                                               | 一般用于通知                                                             |

## 服务器钩子
服务器端钩子在推送到服务器之前和之后运行 可以在 push 之前检查 【拒绝 push】 或者在 push 之后进行其他操作或通知

| 钩子               | 时机                         | 备注                                           |
| -------------------- | ------------------------------ | ------------------------------------------------ |
| pre-receive\update | 最先被调用                   | 如果它以非零值退出，所有的推送内容都不会被接受 |
| post-receive       | 更新其他系统服务或者通知用户 | 服务器端钩子                                   |

## husky

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint"
    }
  }
}
```