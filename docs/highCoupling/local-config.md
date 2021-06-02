---
title: localConfig
---

## localConfig

> 为组件和方法提供统一的全局化配置

## 使用

```
import localConfig from 'td-antd';

// 配置
localConfig.config({
  appStore: app._store
});

// 获取新实例
const instance = localConfig.newInstance();
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|config|配置项|Object|{}|
|newInstance|返回新的配置项实例|Function|-|

### config

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|appStore|被 `dva` 包裹的 app._store 对象，提供获取 model 数据和 dispatch() 等|Object|-|
|proxy|fetch 请求的代理标示，如：/market|String|-|
|request|异步请求实例，一般是脚手架中封装的 fetch|Function|-|
|locale|语言，支持 `en/zh`|String|-|
|permission|是否开启权限校验，针对 Permission 组件|Boolean|-|
|uploadFilterOptions|TdUpload 的 filterOptions 属性的全局配置方法|Function|-|
