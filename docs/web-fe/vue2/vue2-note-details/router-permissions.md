<!-- 本文需结合自己代码实践并 转为自己总结内容后 再公开发布 -->
# 路由权限

## 介绍

- 开发后台管理系统时，我们都会去做一件事，就是`动态路由权限控制`，即 `不同权限的角色登录后，展示不同的菜单路由`
- 实现`路由权限`常用的两种方案：1. 前端使用`addRoute`动态挂载路由; 2. 从服务端返回可访问的路由菜单。


## 前端实现路由控制

## 基于后端返回路由菜单

### 思路描述

- 登录后，后端接口会直接返回当前用户可访问的完整路由菜单
- 后端返回的路由菜单不包括`login`、`404`等页面的。前端这边还是需要写一份完整的路由列表，基于后端返回的可访问路由菜单 去筛选出需要挂载在router上的路由列表。

### 具体实现

#### 接口获取动态路由

- 登陆后，后端返回 `userMenus`，前端将其存到`Vuex`。
```js
// login()
const login = () => {
  ruleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      store.dispatch('userModule/login', { ...accountForm })
    } else {
      console.log('error submit!')
    }
  })
}
```
```js
// vuex
async login({ commit }, payload: IRequest) {
  // 登录获取token
  const { data } = await accountLogin(payload)
  commit('SET_TOKEN', data.token)
  localCache.setCache('token', data.token)
  // 获取用户信息
  const userInfo = await getUserInfo(data.id)
  commit('SET_USERINFO', userInfo.data)
  localCache.setCache('userInfo', userInfo.data)
  // 获取菜单
  const userMenu = await getUserMenu(userInfo.data.role.id)
  commit('SET_USERMENU', userMenu.data)
  localCache.setCache('userMenu', userMenu.data)
  router.replace('/main/analysis/dashboard')
}
```
- 返回的`userMenus`是一个数组，包含了`图标icon`、`路由名称name`、`路由地址`、`子路由children`、`路由type` 等重要信息。前面这些信息主要是用于遍历生成页面`左侧菜单`，`路由type`则是用于后面筛选出需要挂载在router上的路由列表。

#### 前端本地静态路由

- `router/index.ts` 中定义 `login`、`404` 等静态路由。
- 将接口可能返回的完整权限菜单，单独放在`router/main`下面。

```js
// router/index.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/analysis/dashboard',
    component: () => import('@/views/main/index.vue'),
    meta: {
      title: '核心技术'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '页面找不到~'
    }
  }
]
```

```js
// 单个菜单内容,如 router/main/xxx/dashboard/dashboard.ts：

const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue')
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  meta: {
    title: '商品统计'
  },
  children: []
}
```

#### 加载本地全部路由

- 用`require.context`方法来加载`router/main`下的所有路由
  
> `require.context` 是 `webpack`的 API，通过执行`require.context()`函数，来获取指定的文件夹内的特定文件，在需要多次从同一个文件夹内导入的模块，使用这个函数可以自动导入，不用每个都显示的写import来引入。

> `require.context(directory，useSubdirectories，regExp) `

> 参数描述：
> 
> `directory`：要搜索文件的相对路径
>
> `useSubdirectories`：是否查询其子目录
>
> `regExp`：匹配基础组件文件名的正则表达式

```js
// 加载router/main下面的路由
const routeFiles = require.context('../router/main', true, /.ts/)

// 遍历routeFiles拿到文件内容
routeFiles.keys().forEach((key) => {
  const route = require('../router/main' + key.split('.')[1]).default
  console.log(route)
  // 所有的路由存到allRoutes中
  allRoutes.push(route)
})

```

#### 筛选路由

- 根据`userMenus`去过滤`router/main`下的路由
- `路由type`字段 主要是区分菜单下是否还有子菜单，1表示有子菜单，2表示没有子菜单。

遍历`allRoutes` 将每项的`path` 与 接口返回的菜单列表`userMenus`里的`path` 进行比较，如果相同就是匹配到了，否则就将这条路由过滤掉。由于`allRoutes` 下的每一项都还可能存在`子路由`，所以我们需要进行递归筛选。

```js
const _recurseGetRoute = (menus: any[]) => {
  for (const menu of menus) {
    if (menu.type === 2) {
      const route = allRoutes.find((route) => route.path === menu.url)
      if (route) routes.push(route)
    } else {
      _recurseGetRoute(menu.children)
    }
  }
}
```

---
- 整理一下路由筛选代码：
```js
import { RouteRecordRaw } from 'vue-router'

export function generateRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]).default
    console.log(route)
    allRoutes.push(route)
  })
  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
```

- 将筛选好的路由列表挂载在router上

将`挂载路由`的时机放在`全局路由守卫`这里，我们在router文件夹下创建一个`permission.ts`，用于写全局路由守卫相关逻辑：

```js
// router/permission.ts

import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import localCache from '@/utils/cache'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
const userMenu = store.state.userModule.userMenu
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: any
  ) => {
    document.title = to.meta.title as string
    const token: string = localCache.getCache('token')
    NProgress.start()
    // 判断该用户是否登录
    if (token) {
      if (to.path === '/login') {
        // 如果登录，并准备进入 login 页面，则重定向到主页
        next({ path: '/' })
        NProgress.done()
      } else {
        store.dispatch('routesModule/generateRoutes', { userMenu })
        // 确保添加路由已完成
        // 设置 replace: true, 因此导航将不会留下历史记录
        next({ ...to, replace: true })
      }
    } else {
      // 如果没有 token
      if (whiteList.includes(to.path)) {
        // 如果在免登录的白名单中，则直接进入
        next()
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        next('/login')
        NProgress.done()
      }
    }
  }
)
router.afterEach(() => {
  NProgress.done()
})
```

```js
// routesModule文件下的代码：

// 引入generateRoutes
import { generateRoutes } from '@/utils/generateRoutes'
actions: {
  generateRoutes({ commit }, { userMenu }) {
    const routes = generateRoutes(userMenu)
    // 将routes => router.main.children
    routes.forEach((route) => {
      router.addRoute('main', route)
    })
  }
}

```

## 参考

  - [前端如何配合后端实现Vue路由权限](https://juejin.cn/post/7096393921034453006)