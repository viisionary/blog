---
title : "Micro-Frontends with qiankun"
date: 2020-11-20 
description: "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
categories : ["架构","微前端"]
toc: true
tags: ["webpack"]
---

可以实现多团队共同开发，每个团队维护使用了不同前端框架的项目，独立使用git，也可以在新网站上集成旧项目

<!--more-->

## Micro-Frontends with qiankun

### 使用【乾坤搭建微前端框架】

[qiankun](https://qiankun.umijs.org/)


## 项目结构

- main-app 【react】
    - child-app-1【react】
    - child-app-2【vue】
    - more

## main-app 【react】

```jsx
import {
    addGlobalUncaughtErrorHandler,
    initGlobalState,
    MicroAppStateActions,
    runAfterFirstMounted,
    start
} from 'qiankun';
import { state } from "./config/initGlobalState";

ReactDOM.render(
/*react component*/
	<div>
	{/* header */}
  {/* aside bar*/}
		<div id="subContainer">
      {/* 子项目页面展示区域，当其加载 该dom内部会被替换*/} 
			<NoPage />
    </div>
	{/* footer */}
  <div/>
)

start({
    prefetch: 'all'
});

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});

addGlobalUncaughtErrorHandler(event => console.log(event));
// 传递state
export const globalActions: MicroAppStateActions = initGlobalState(state);

globalActions.onGlobalStateChange((state, prev) => {
    console.log('[MainApp] ', state, prev);
    if (state.login.show) {
// 在主项目中处理子项目发来的消息
        store.dispatch({ type: SET_USER_LOGIN, payload: { hideLogin: false, redirectUrl: state.login.redirect, addTab: !!state.login.addTab } })
        //显示登录弹窗
    }
});
```

### 初始化全局状态 initGlobalState.js

```jsx
const customHistory = createBrowserHistory();
export const state = {
    user: {
        id: Storage.getItem('operatorId'),
        name: Storage.getItem('userName'),
        phone: Storage.getItem('mobile'),
        role: Storage.getItem('role'),
        token: Storage.getItem('token'),
        oplevel: Storage.getItem('roleId'),
        provinceId: Storage.getItem('provinceId')
    },
    /**
     * 跳转 all page 回调
     * @param pathname
     * @param state
     * @param hash
     * @param search
     */
    // @ts-ignore
    historyCallback: ({pathname, state, hash, search}) => {
    // 子项目间页面跳转在main-app中处理；
        const {location: {pathname: beforePathname,}} = customHistory;
        customHistory.push({pathname, hash: hash || '', search: search || ''}, state || '')
    },
};
```

### 定义子应用

```jsx
export const getMicroApps = (host: string) => [
    {
        // 北京 vue
        "name": "web-firm",
        "entry": host + ":8887",
        "container": "#subContainer",
        "activeRule": "/firm",
    },
    {
        // 成都 vue
        "name": "web-member",
        "entry": host + ":8889",
        "container": "#subContainer",
        "activeRule": "/member",
    },
    {
        // 成都 vue 内容
        "name": "web-content",
        "entry": host + ":8885",
        "container": "#subContainer",
        "activeRule": "/content",
    },
    {
        // 北京 react
        "name": "web-hotLine",
        "entry": host + ":8886",
        "container": "#subContainer",
        "activeRule": "/hot",
    },
    {
        //成都 视频制作
        name: 'video-product',
        entry: host + ':8882',
        container: '#subContainer',
        activeRule: '/video-product'
    }
]
```

### 注册子应用

```jsx
registerMicroApps(getMicroApps('//' + host), {
                beforeLoad: [beforeLoad],
                beforeMount: [beforeMount],
                afterMount: [afterMount],
                beforeUnmount: [beforeUnmount],
                afterUnmount: [afterUnmount],
            });
```

## child-app-1 【react】

入口文件

```jsx

function render(props: any) {
    const { container } = props;
    ReactDOM.render(<ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <PrivateRoute />
        </Provider>
    </ConfigProvider>, container ? container.querySelector('#root') : document.querySelector('#root'));
}

function storeTest(props) {
    // @ts-ignore
    props.onGlobalStateChange((value, prev) => console.log(`[${props.name} props change]:`, value, prev), true);
}

export async function bootstrap() {
    console.log('[web-hotLine] react app bootstraped');
}

export async function mount(props: any) {
    console.log('[web-hotLine] props from main framework', props);
    storeTest(props);
    render(props);
}

export async function unmount(props: any) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}
```

### child-app-2

入口文件 main.ts

```jsx
export function render(props = {}) {
    console.log('测试测试测试')
    // @ts-ignore
    const { container } = props
    console.log('container:' + container)
    instance = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

export async function mount(props) {
    console.log('主应用传递的props:')
    console.log(props)
    storeTest(props)
    setGlobalState = props.setGlobalState
    render(props)
}

function storeTest(props) {
    // @ts-ignore
    props.onGlobalStateChange((value, prev) => console.log(`[${props.name} props change]:`, value, prev), true);
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function unmount() {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
}
```

# 数据传递

## 存储

### localStorage

### document.cookie

## 父子组件传值

## 子组件间传值

# 路由

可任意跳转

# 部署

![Micro-Frontends%20with%20qiankun%20f6f7e51842ef440ebde3ed5eb8e910ab/Untitled.png](Micro-Frontends%20with%20qiankun%20f6f7e51842ef440ebde3ed5eb8e910ab/Untitled.png)

![Micro-Frontends%20with%20qiankun%20f6f7e51842ef440ebde3ed5eb8e910ab/Untitled%201.png](Micro-Frontends%20with%20qiankun%20f6f7e51842ef440ebde3ed5eb8e910ab/Untitled%201.png)

## NGINX 配置

为每个项目配置服务

```jsx
#主应用
                location / {
                        rewrite /h5/(.*) http://10.1.62.113:8888/video-product-h5;
                        if ($request_filename ~* ^.*?.(html|htm)$) {
                                add_header Cache-Control no-cache,no-store,must-revalidate;
                        }
                        root /home/ccbop/wwwRoot/ccbop-frontend/main-app;
                        index index.html;
                        try_files $uri $uri/ /index.html;
                }

                #子应用
                location /subapp {
                        if ($request_filename ~* ^.*?.(html|htm)$) {
                                add_header Cache-Control no-cache,no-store,must-revalidate;
                        }
                        alias /home/ccbop/wwwRoot/ccbop-frontend/subapp;
                        try_files $uri $uri/ /index.html;
                }
                #视频制作h5
                location /video-product-h5 {
                        if ($request_filename ~* ^.*?.(html|htm)$) {
                                add_header Cache-Control no-cache,no-store,must-revalidate;
                        }
                        alias /home/ccbop/wwwRoot/ccbop-frontend/video-product-h5;
                        try_files $uri $uri/ /video-product-h5/index.html;
                }
```

## 静态资源处理

要请求到正确的路径 

```jsx
// vue.config.js
module.exports = {
    outputDir: 'dist',
    assetsDir: 'firmStatic',
		port: 8887
}
```

github 链接
