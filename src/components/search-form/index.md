---
title: SearchForm
---

## SearchForm

基于 Form 的二次封装，一般用于列表页头部的搜索栏。组件内部包裹了 Row 组件，在使用组件时，可直接使用 Col 进行排版

```jsx
import React from 'react';
import { Col } from 'antd';
import SearchForm from './index';
import FormItem from '../form-item';

export default () => {
  return (
    <SearchForm
      btnText="搜索"
      callback={(values) => {
        console.log(values);
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
|btnText|按钮文案，如果不存在，则不显示按钮|String|查询|
|buttonProps|查询按钮的 props 属性|Object|{}|
|callback|回调函数，返回表单内容|Function|() => {}|
|extraNode|额外的节点|ReactNode|--|

## ref

> 请使用 wrappedComponentRef 进行代替，内置了 reset 方法用于清空表单数据。
