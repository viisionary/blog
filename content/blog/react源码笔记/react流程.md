---
title: react 源码阅读 - 流程
date: 2021-04-02
categories : ["react","源码"]
tags: ["react","源码"]

---
React16架构

<!--more-->

* scheduler 调度 【v15没有】
  > 调度任务的优先级，高优任务优先进入Reconciler
  > 到底是怎么调度的？
  > react v18的并发模式 Concurrent Mode
* reconciler 协调 
  > 负责找出变化的组件
* renderer 渲染
  > 负责将变化的组件渲染到页面上

## 双缓存 - Fiber树 【由fiber Node组成】
>                1. current
>                2. workInProgress

执行代码 渲染一个div

对应的fiber树是 div-> this is simple html span

```javascript
   ReactDOM.render(
	<div>this is simple html span</div>,
	document.getElementById('container')
);
```

![img_4.png](/assets/react/img_4.png)
render是一个入口

![img_13.png](/assets/react/img_13.png)
![img_14.png](/assets/react/img_14.png)

首次render需要创建FiberRoot

执行unbatchedUpdates 
// 为什么得是unbatched的？
//batchedUpdates 会合并一些update操作

---

## trigger api

![img_17.png](/assets/react/img_17.png)
执行updateContainer 创建一个update

```javascript
// update
{
	current$1,
		eventTime,
		lane //调起request update lane 请求分配一个lane //优先级

}
```

createUpdate(eventTime, lane)

**enqueueUpdate(current$1, update)**
啥时候出队的 根据什么出队的
**scheduleUpdateOnFiber**
 // 开始调度

---

## scheduled render

> 意思时执行render 和 current对比 => 重新形成fiber树 - 所以是调度render

performSyncWorkOnRoot

⬇️

renderRootSync

⬇️

workLoopSync ➡️ performUnitOfWork ♻️ 先向下深度搜索

performUnitOfWork
> performUnitOfWork方法会创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。

### beginWork

主要工作是看看有没有可以复用的，复用或者新建形成fiber树

传入当前Fiber节点，创建子Fiber节点

```typescript
function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderLanes: Lanes,
): Fiber | null {
    const updateLanes = workInProgress.lanes;
    // update时如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
    // mount时不走这里
    if (current !== null) {

        const oldProps = current.memoizedProps;
        const newProps = workInProgress.pendingProps;

        if (oldProps !== newProps ||
            hasLegacyContextChanged()) {
            // props 或者 context 改变了 打个标记
        } else if (!includesSomeLane(renderLanes, updateLanes)) {
            // props / context 无变化
            switch (workInProgress.tag) {
                // push something to workInProgress
            }
            // 复用current 
            return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);

        }
    }

    // current 为null的时候走这里 即mount时
    // 重置优先级
    workInProgress.lanes = NoLanes;
    switch (workInProgress.tag) {
        case IndeterminateComponent:
        case LazyComponent:
        case FunctionComponent:
        //        ...more
        // 各种updateXxxComponent 创建节点
        // 最终会进入reconcileChildren 触发diff算法
    }
}
```

根据不同的current状态（mount/update）进入不同的方法

```typescript

export function reconcileChildren(
    current: Fiber | null,
    workInProgress: Fiber,
    nextChildren: any,
    renderLanes: Lanes
) {
    if (current === null) {
        // 对于mount的组件
        workInProgress.child = mountChildFibers(
            workInProgress,
            null,
            nextChildren,
            renderLanes,
        );
    } else {
        // 对于update的组件
        workInProgress.child = reconcileChildFibers(
            workInProgress,
            current.child,
            nextChildren,
            renderLanes,
        );
        // 后接diff算法总结
    }
}
```

### completeWork

mount时

* 为Fiber节点生成对应的DOM节点
* 将子孙DOM节点插入刚生成的DOM节点中
* 处理props update时
* onClick、onChange等回调函数的注册
* 处理style prop
* 处理DANGEROUSLY_SET_INNER_HTML prop
* 处理children prop

```typescript
function completeWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderLanes: Lanes,
): Fiber | null {
    const newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
        // bubbleProperties(workInProgress);
        // popLegacyContext(workInProgress);

        // ...
    }
}
```

completeUnitOfWork

---

## commit

> 此阶段 commit 上一步形成的fiber树， 改变fiberRootNode的指向 显示新生成的fiber树

commitRoot

commitMutationEffects

commitMutationEffectsOnFiber

commitPlacement // 根据节点的标记、插入dom

insertOrAppendPlacementNodeIntoContainer
