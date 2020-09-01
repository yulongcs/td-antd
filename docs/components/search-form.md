---
title: SearchForm
---

## SearchForm

基于 Form 的二次封装，一般用于列表页头部的搜索栏。组件内部包裹了 Row 组件，在使用组件时，可直接使用 Col 进行排版

## 代码演示

```jsx
/**
 * title: 基础用法
 */
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

```jsx
/**
 * title: 无 label 模式
 */
import React from 'react';
import { Col, DatePicker, Button } from 'antd';
import { SearchForm, FormItem, SelectMap } from 'td-antd';

export default () => {
  return (
    <SearchForm
      extraNode={<Button type="primary">新增</Button>}
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
              fieldName="phone"
              inputProps={{ placeholder: '手机' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="address"
              inputProps={{ placeholder: '地址' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="age"
              inputProps={{ placeholder: '年龄' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="sex"
            >
              <SelectMap placeholder="性别" data={['男', '女']} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="time"
            >
              <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
            </FormItem>
          </Col>
        </React.Fragment>
      )}
    </SearchForm>
  );
}
```

```jsx
/**
 * title: 展开 / 收起
 * desc: 当 expandNode 属性存在时，会出现 "展开 / 收起" 的按钮
 */
import React from 'react';
import { Col, DatePicker } from 'antd';
import { SearchForm, FormItem, SelectMap } from 'td-antd';

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
      expandNode={(formProps) => (
        <>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="time"
            >
              <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="idCard"
              inputProps={{ placeholder: '身份证' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="name"
              inputProps={{ placeholder: '姓名' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="bankNo"
              inputProps={{ placeholder: '银行卡号' }}
            />
          </Col>
        </>
      )}
    >
      {(formProps) => (
        <React.Fragment>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="phone"
              inputProps={{ placeholder: '手机' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="address"
              inputProps={{ placeholder: '地址' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="age"
              inputProps={{ placeholder: '年龄' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="sex"
            >
              <SelectMap placeholder="性别" data={['男', '女']} />
            </FormItem>
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
|expandNode|折叠字段，紧跟 children 之后的 node 内容|Function(formProps)||
|callback|回调函数，返回表单内容|Function|() => {}|
|extraNode|额外的节点|ReactNode|--|

### callback(type, values)

```
type = query 时，表示查询
type = reset 时，表示重置
```

## ref

> 请使用 wrappedComponentRef 进行代替，内置了 reset 方法用于清空表单数据。
