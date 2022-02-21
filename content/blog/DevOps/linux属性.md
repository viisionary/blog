---

title : "linux 系统属性"
date: 2021-07-16
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
tags : [                              
"DevOps","linux",
]
toc: true
---

Linux 系统属性

<!--more-->

## linux 属性

### free 查看内存

```powershell
free
```

The top line reports on system memory, the bottom line reports on swap space. We’ll introduce the columns here, then look at them in more detail shortly. The columns for the memory line are as follows:

- **Total**: The total amount of physical RAM installed in your computer.
- **Used**: This is calculated by `Total`(`Free`+`Buffers`+`Cache`).
- **Free**: The amount of unused memory. Why doesn’t Total=Used+Free? We’ll explain that shortly.
- **Shared**: Memory that is used by the `tmpfs` file system.
- **Buff/cache**: Memory used for buffers and cache.
- **Available**: This is an estimation of the memory that is available to service memory requests from applications, any other functioning software within your computer, such as your graphical [desktop environment](https://en.wikipedia.org/wiki/Desktop_environment) and Linux commands.
