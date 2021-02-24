---
title: Role
---

## Role

角色管理页面

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|menuTreeUrl|获取完整权限树的接口地址|String|'/system/menu/list/tree.json'|
|roleMenuUrl|获取当前角色权限树的接口地址|String|'/user/getRoleMenu.json'|
|addRoleUrl|新增角色的接口地址|String|'/system/role/add.json'|
|editRoleUrl|修改角色的接口地址|String|'/system/role/edit.json'|
|removeUrl|删除角色的接口地址|String|'/system/role/remove.json'|
|disabledRoleCode|无法被删除的角色码集合|Array|[]|
