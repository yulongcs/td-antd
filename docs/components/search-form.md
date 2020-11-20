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
    >
      <Col span={6}>
        <FormItem
          label="手机"
          name="phone"
          required={false}
        />
      </Col>
      <Col span={6}>
        <FormItem
          label="地址"
          name="address"
          required={false}
        />
      </Col>
      <Col span={6}>
        <FormItem
          label="年龄"
          name="age"
          required={false}
        />
      </Col>
      <Col span={6}>
        <FormItem
          label="性别"
          name="sex"
          required={false}
        >
          <SelectMap data={['男', '女']} />
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem
          label="时间"
          name="time"
          required={false}
        >
          <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
        </FormItem>
      </Col>
    </SearchForm>
  );
}
```

```jsx
/**
 * title: 无 label 模式
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
    >
      <Col span={6}>
        <FormItem
          name="phone"
          required={false}
          inputProps={{ placeholder: '手机' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="address"
          required={false}
          inputProps={{ placeholder: '地址' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="age"
          required={false}
          inputProps={{ placeholder: '年龄' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="sex"
          required={false}
        >
          <SelectMap placeholder="性别" data={['男', '女']} />
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem
          name="time"
          required={false}
        >
          <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
        </FormItem>
      </Col>
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
      expandNode={
        <>
          <Col span={6}>
            <FormItem
              name="time"
              required={false}
            >
              <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              name="idCard"
              required={false}
              inputProps={{ placeholder: '身份证' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              name="name"
              required={false}
              inputProps={{ placeholder: '姓名' }}
            />
          </Col>
          <Col span={6}>
            <FormItem
              name="bankNo"
              required={false}
              inputProps={{ placeholder: '银行卡号' }}
            />
          </Col>
        </>
      }
    >
      <Col span={6}>
        <FormItem
          name="phone"
          required={false}
          inputProps={{ placeholder: '手机' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="address"
          required={false}
          inputProps={{ placeholder: '地址' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="age"
          required={false}
          inputProps={{ placeholder: '年龄' }}
        />
      </Col>
      <Col span={6}>
        <FormItem
          name="sex"
          required={false}
        >
          <SelectMap placeholder="性别" data={['男', '女']} />
        </FormItem>
      </Col>
    </SearchForm>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|expandNode|额外渲染的元素，紧跟 children 之后，且开启折叠按钮|ReactNode||
|callback|回调函数，返回表单内容|Function|() => {}|
|extraNode|额外的节点|ReactNode|--|

### callback(type, values)

```
type = query 时，表示查询
type = reset 时，表示重置
```
