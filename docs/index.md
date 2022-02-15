---
title: 介绍
order: 0
---

## 简介

基于 ant-design 4.x 开发的业务组件。

## 组件介绍

- Components：公共组件，低耦合
- High-coupling：高耦合的业务组件，与项目匹配
- tools：工具包

## 依赖

请确保宿主项目安装了以下依赖

|依赖名|版本|
|:--|:--|
|react|>=16.9.0|
|react-dom|>=16.9.0|
|antd|4.17.4|
|moment|2.19.1|
|classnames|2.2.6|
|lodash|4.17.15|
|dva|2.6.0-beta.19|

## 安装

```
// 可使用 npm 进行安装
$ npm install --save td-antd
```

## 使用组件

```
import { DescList } from 'td-antd';

// es 引用
import DescList from 'td-antd/es/desc-list';
```

## 按需加载

下面方式可以只加载用到的组件。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

```
// .babelrc
{
  "plugins": [
    ['import', { libraryName: 'td-antd', libraryDirectory: 'es', style: false }, 'td-antd'],
  ]
}
```
