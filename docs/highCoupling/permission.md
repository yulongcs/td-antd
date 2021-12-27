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

## Permission.useRole()

获取系统角色

|实例值|说明|
|:--|:--|
|SA|超级管理员|
|PM|平台|
|EP|企业|
|AG|代理商|
|ME|医疗机构|
|AR|代表/MSL|
|MW|医生/专家|
|PERSONAL|AR 和 MW 的集合|
|roleType|当前角色|

### demo

```
// 验证系统权限码
Permission.is(['dept_del', 'mgr_page']);

// 验证当前账号是否为 cdd
Permission.is(['cdd', 'info.account']);

// 获取角色
const { PM, SA, EP } = Permission.useRole();

if (EP) {
  // 如果是企业...
}
if (PM) {
  // 如果是平台...
}
```
