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


查看当前 Linux 版本
```shell
[root@eb63132 ~]# cat /etc/redhat-release 
Red Hat Enterprise Linux release 8.4 (Ootpa)
```
```shell
# 压缩
tar zcvf www.tar.gz *
# 包含隐藏文件
tar zcvf www.tar.gz .[!.] *
```

```shell
%Cpu(s): 35.0 us, 25.1 sy,  0.0 ni, 39.7 id,  0.1 wa,  0.0 hi,  0.1 si,  0.0 st

KiB Mem : 13173243+total, 52521144 free, 33416016 used, 45795268 buff/cache
```

```shell
cat /proc/cpuinfo | grep 'model name' | uniq	

model name	: Intel(R) Xeon(R) CPU E5-2660 v3 @ 2.60GHz
```