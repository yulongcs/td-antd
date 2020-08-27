---
title: SearchForm
---

## SearchForm

基于 Form 的二次封装，一般用于列表页头部的搜索栏。组件内部包裹了 Row 组件，在使用组件时，可直接使用 Col 进行排版

## 代码演示

```jsx
import React from 'react';
import { Col } from 'antd';
import { SearchForm, FormItem } from 'td-antd';

export default () => {
  return (
    <SearchForm
      callback={(type, values) => {
        if (type === 'query') {
          console.log(values);
        }
        if (type === 'reset') {
          console.log('重置表单');
        }
      }}
    >
      {(formProps) => (
        <React.Fragment>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="性别"
              fieldName="sex"
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="地址"
              fieldName="address"
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="年龄"
              fieldName="age"
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="手机"
              fieldName="phone"
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="年级"
              fieldName="grade"
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              label="班级"
              fieldName="class"
            />
          </Col>
        </React.Fragment>
      )}
    </SearchForm>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|children|需要渲染的子元素|Function(formProps)||
|callback|回调函数，返回表单内容|Function|() => {}|
|extraNode|额外的节点|ReactNode|--|

### callback(type, values)

```
type = query 时，表示查询
type = reset 时，表示重置
```

## ref

> 请使用 wrappedComponentRef 进行代替，内置了 reset 方法用于清空表单数据。
