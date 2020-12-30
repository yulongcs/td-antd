---
title: DescList
---

## DescList

基于 Descriptions 的二次封装，通常用于详情信息的展示。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { DescList } from 'td-antd';

export default () => {
  return (
    <DescList
      column={2}
      columns={[
        {
          title: '名字',
          dataIndex: 'name',
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '地址',
          dataIndex: 'address',
        }, {
          title: '电话',
          render: record => record.phone,
        }, {
          title: '描述',
          dataIndex: 'desc.text',
          span: 2,
        }, {
          title: '地址被隐藏了',
          dataIndex: 'address',
          visible: false,
        }, {
          title: '邮箱被隐藏了',
          dataIndex: 'email',
          visible: () => {},
        }
      ]}
      dataSource={{
        name: 'andy',
        age: 18,
        address: '树上第三根叉',
        phone: '138xxxxxxxx',
        email: 'xxx@xxx.com',
        desc: {
          code: 1,
          text: 'dataIndex 的嵌套写法'
        },
      }}
    />
  );
}
```

## API

支持原 [Descriptions](https://ant-design.gitee.io/components/descriptions-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|dataSource|数据源|Object|{}|
|columns|列描述数据对象|Array|[]|
|defaultValue|当值为空时，默认展示的值|String|'--'|

### columns

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|label展示的值|String/ReactNode|-|
|dataIndex|数据在数据项中对应的 key，支持嵌套写法"key.key.key"|String|-|
|visible|是否显示，默认显示；如果是函数时，必须返回布尔值|Boolean/Function(record)|true|
|render|生成复杂数据的渲染函数|Function(record) {}|-|
|span|包含列的数量|Number|1|
