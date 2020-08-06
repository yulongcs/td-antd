---
title: redirect
---

## redirect

dva.routerRedux.push 的简单封装，实现路由切换。必须配置了 `localConfig` 后才能正常使用。

```
// 路由切换，如切换至：localhost:8080/demo
redirect('/demo', dispatch); // 第二个参数 dispatch 如果不传，将会从全局配置(localConfig)中获取
```
