---
title: SearchForm-1
---

## SearchForm

基于 Form 的二次封装，一般用于列表页头部的搜索栏。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { Col, DatePicker } from 'antd';
import { FormItem, SelectMap } from 'td-antd';
import SearchForm from '../../src/search-form-1';

export default () => {
  return (
    <SearchForm
      span={6}
      columns={[
        {
          title: '手机',
          dataIndex: 'phone',
          inputProps: { placeholder: '请输入手机号' },
        }, {
          title: '地址',
          dataIndex: 'address',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '状态',
          dataIndex: 'status',
          component: <SelectMap data={['进行中', '已完成']} />
        },
      ]}
      callback={(type, values) => {
        if (type === 'query') {
          console.log(values);
        }
        if (type === 'reset') {
          console.log('重置表单');
        }
      }}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|span|栅格占位格数|Number|8|
|columns|表单项数组|Array|[]|
|callback|回调函数，返回表单内容|Function|() => {}|

### columns

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|表单的 label|String/ReactNode|-|
|dataIndex|表单的 name|String|-|
|component|Form.Item 的子元素|ReactNode|Input|
|formItemProps|表单项的属性|Object|-|
|inputProps|当component不存在时，可以对 Input 进行描述|Object|-|

### callback(type, values)

```
type = query 时，表示查询
type = reset 时，表示重置
```
