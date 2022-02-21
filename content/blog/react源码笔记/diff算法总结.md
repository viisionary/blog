---
title: react 源码阅读 - diff 算法
date: 2021-04-02
categories : ["react","源码"]
---
版本 v17.0.2
单节点比较、多节点比较


<!--more-->

详细写了 diff 算法的原理，写了示例，分析了源码，加了注释

// TODO 有空加一个可debu g的demo 还有 模拟一个可test的简易diff 

可检查[1,2,3] [{props:{children:[]},next:''},{},{}]
## 版本 v17.0.2

diff 算法只对同级元素进行

1. diff算法比较的是什么 当前页面中的DOM节点对应的fiber节点 🆚 新一次render的结果生成的filter节点 生成的workInProgress Fiber 将被渲染到页面
2. diff算法的作用 找到可复用的fiber节点，提高效率
3. diff算法由什么触发 reconcile child fibers
4. diff算法在哪个阶段执行
5. diff 就是在 遍历 - 打标记，知道resultingFirstChild 记录了新的fiber树
   
// TODO
// new children debug看一下
// oldFiber debug看一下

### 单节点 / 调和单节点

对于object/number/string

先检查上次更新时fiber节点是否存在对应DOM - 即检查是不是首次渲染，渲染过才有DOM

如果不存在对应DOM，则直接新生成新节点返回

要是存在对应DOM，继续检查是否可复用 - key & type相同

可复用的话，将节点新生成一个副本返回

不可复用的话，将DOM标记为需要删除，再新生成节点返回

```jsx
<div>old</div>
// ⬇️ type & key = null 没变; children改变，div 可复用，标记child需要更新
<div>new</div>

<div>old</div>
// ⬇️ type改变 直接标记div为delection 新生成 p-> new 返回
<p>new</p>

<div key="old">old</div>
// ⬇️ key 改变 不可复用
<div key="new">old</div>
```

### 多节点

对于 array

对 old array & new array 进行两次遍历

因为一般在业务中更新的情况要比增删的次数多

所以先处理更新的情况

1. 对于 array只有更新的情况

![img_5.png](/assets/react/img_5.png)

一次遍历即可结束 给要改变的节点打上标记

2. 第一次遍历 old array没有了 - new array有剩余 - 新增

![img_6.png](/assets/react/img_6.png)

第一次遍历标记完更新之后，继续遍历new array剩余部分，都标记为 placement

3. 第一次遍历 new array没有了 - old array有剩余 - 删除

![img_8.png](/assets/react/img_8.png)

继续遍历old array，都标记为deletion

4. 第一次没有遍历完 - new array 和 old array 都有剩余

![img_9.png](/assets/react/img_9.png)

将 剩余的old array 生成 key -> fiber node 对应表； 方便new array 遍历时找对应的

> 为什么需要unique key
> 
> 当出现在头部插入的行为时，生成了对应表 之前的fiber node 就可以复用
> 
> 要是 使用了index作为 key   prop传来的值可以正常使用， state找的时候就不对 【还有input输入框这种的值】
> （子组件自己的东西会出错）
> 复用的时候 key -> fiber node 对应的是错误的 0 - 0 => 0 - 1 , 1 - 0 
> 
> 在尾部插入时 index 相对来说是稳定的 就没有问题
> 
> 排序的时候 index是没变化的 props 跟着变了 state还是对应的原来的index 就不会有变化


{{<codepen ZEKjyRm>}}

开始第二次循环，遍历剩余的 new array

![img_10.png](/assets/react/img_10.png)

标记移动了、删除了、新增了的节点

hint：节点从后向前移消耗较大、因为标记不变的是1

![img_11.png](/assets/react/img_11.png)

### 这部分的代码在 react-reconciler

```shell
packages/react-reconciler/src/ReactChildFiber.new.js
```

编译后集中到了 reactDOM.js

有两个方法 reconcileSinglePortal ？由ReactDOM.createPortal创建来的？ reconcileSingleElement

```typescript
// 去掉了一些dev代码
function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    element: ReactElement,
    lanes: Lanes,
): Fiber {
    const key = element.key;
    let child = currentFirstChild;
    // 判断是否存在对应DOM节点
    while (child !== null) {
        // 上一次更新存在DOM节点，接下来判断是否可复用
        // 比较key是否相同
        if (child.key === key) {
            // key相同，接下来比较type是否相同
            const elementType = element.type;
            // TODO ??  React.Fragment这个类型的？
            if (elementType === REACT_FRAGMENT_TYPE/*0xeacb*/) {
                if (child.tag === Fragment /* 这是一个常量 7*/) {
                    deleteRemainingChildren(returnFiber, child.sibling);
                    // 可以复用，返回复用的fiber
                    const existing = useFiber(child, element.props.children);
                    existing.return = returnFiber;
                    return existing;

                }
            } else {
                // type相同 可复用
                if (child.elementType === elementType ||
                    // Lazy types
                    (enableLazyElements &&
                        typeof elementType === 'object' &&
                        elementType !== null &&
                        elementType.$$typeof === REACT_LAZY_TYPE &&
                        resolveLazy(elementType) === child.type)
                ) {
                    deleteRemainingChildren(returnFiber, child.sibling);
                    const existing = useFiber(child, element.props);
                    existing.ref = coerceRef(returnFiber, child, element);
                    existing.return = returnFiber;
                    return existing;

                }
                // key相同但是type不同,将该fiber及其兄弟fiber标记为删除
                // TODO 为啥兄弟也删？
                /**
                 * // 当前页面显示的
                 ul > li * 3

                 // 这次需要更新的
                 ul > p
                 p 为单一节点 type变了 要把旧的li全部删掉
                 */
                deleteRemainingChildren(returnFiber, child);
            }
        } else {
            // key不同，将该fiber标记为删除
            deleteChild(returnFiber, child);
        }
    }
    // 创建新的filber 并返回
    if (element.type === REACT_FRAGMENT_TYPE) {
        const created = createFiberFromFragment(
            element.props.children,
            returnFiber.mode,
            lanes,
            element.key,
        );
        created.return = returnFiber;
        return created;
    } else {
        const created = createFiberFromElement(element, returnFiber.mode, lanes);
        created.ref = coerceRef(returnFiber, currentFirstChild, element);
        created.return = returnFiber;
        return created;
    }
}
```

```typescript

function reconcileChildrenArray(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    lanes: Lanes,
    newChildren: Array,
): Fiber | null {
    //newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表
    //不支持双指针遍历。
    //newChildren[0]与fiber比较，newChildren[1]与fiber.sibling
    let resultingFirstChild: Fiber | null = null;
    let previousNewFiber: Fiber | null = null;

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;
    // 第一次遍历
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
        // ------------ TODO 相同就比下一个兄弟？
        if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
        } else {
            nextOldFiber = oldFiber.sibling;
        }
        // ------------ 打上更新标记
        const newFiber = updateSlot(
            returnFiber,
            oldFiber,
            newChildren[newIdx],
            lanes,
        );  
        // 有不同的了 跳出循环
        if (newFiber === null) {
            if (oldFiber === null) {
                oldFiber = nextOldFiber;
            }
            break;
        }
        // 处理副作用
        if (shouldTrackSideEffects) {
            // oldFiber有东西 不是null newFiber没了，old剩余部分标记删除
            if (oldFiber && newFiber.alternate === null) {
                deleteChild(returnFiber, oldFiber);
            }
        }
        // 打个标记？？  placement 是要新增的
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

        // -------TODO ??
        if (previousNewFiber === null) {
            resultingFirstChild = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
        //----⬆️ 第一次遍历结束
    }
    // newChildren遍历完了 // 删除剩下的兄弟&children
    if (newIdx === newChildren.length) {
        deleteRemainingChildren(returnFiber, oldFiber);
        // 删除完毕 直接 return
        return resultingFirstChild;
    }
    //oldFiber 遍历完了 new 的还有
    if (oldFiber === null) {
        // 继续遍历new的剩余部分
        for (; newIdx < newChildren.length; newIdx++) {
            // 创建新的fiber节点
            const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
            if (newFiber === null) {
                continue;
            }
            lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
                // TODO: Move out of the loop. This only happens for the first run.
                resultingFirstChild = newFiber;
            } else {
                previousNewFiber.sibling = newFiber;
            }
            previousNewFiber = newFiber;
        }
        // new array 协调完毕 直接return
        return resultingFirstChild;
    }

    // 第二次遍历开始
    // 剩余old array
    // 将所有子级添加到键映射以进行快速查找
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    for (; newIdx < newChildren.length; newIdx++) {
        // 生成key-fiber对应表
        const newFiber = updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            newChildren[newIdx],
            lanes,
        );
        if (newFiber !== null) {
            if (newFiber.alternate !== null) {
                existingChildren.delete(
                    newFiber.key === null ? newIdx : newFiber.key,
                );
            }
        }
    }
    // 剩余old array打上删除标记
    existingChildren.forEach(child => deleteChild(returnFiber, child));
    return resultingFirstChild;
}
```
