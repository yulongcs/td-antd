---
title: Permission
---

## Permission

权限校验组件

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|code|一组权限码|String/Array|-|
|keyword|appStore 中 global 存储的字段名，支持嵌套写法|String|'permissions'|
|homePath|首页地址|String|'/welcome'|
|isShow|是否展示403提示|Boolean|false|

## Permission.is(code, keyword)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|code|一组权限码|String/Array|-|
|keyword|appStore 中 global 存储的字段名，支持嵌套写法|String|'permissions'|

### demo

```
// 验证系统权限码
Permission.is(['dept_del', 'mgr_page']);

// 验证当前账号是否为 cdd
Permission.is(['cdd', 'info.account']);
```
