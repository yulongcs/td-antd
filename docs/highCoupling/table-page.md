---
title: TablePage
---

## TablePage

基于 Table 封装的简易列表页，包含搜索栏和 table

## 代码演示

```jsx
/**
 * title: 基础用法
 */
 
import React, { useState } from 'react';
import { Row, Col, Table, Button, DatePicker } from 'antd';
import { TablePage, SelectMap, FormItem } from 'td-antd';

export default () => {
  return (
    <TablePage
      url="/aaa.json"
      searchReturn={(values) => {
        console.log(values);
        
        return values;
      }}
      searchFormProps={{
        extraNode: <Button type="primary">新增</Button>,
        expandNode: (formProps) => (
          <Col span={6}>
            <FormItem
              {...formProps}
              fieldName="time"
            >
              <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
            </FormItem>
          </Col>
        ),
        children: (formProps) => (
          <>
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
          </>
        ),
      }}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|列表请求地址。由于内置使用 request 是从 localConfig 中获取的，不必再使用 proxy |String|-|
|tableProps|支持原 [Table](https://3x.ant.design/components/table-cn/) 的 API|Object|{}|
|columns|表格列的配置描述，同原 Table 组件|ColumnProps[]|[]|
|searchFormProps|SearchForm 组件的属性|Object|{}|
|searchReturn|自定义搜索栏的回调函数，必须返回结果对象给组件以供搜索使用|Function(values)|-|
|defaultParams|默认参数，一般是不变的|Object|{}|
|success|请求成功后的回调函数|Function({ values = [] })|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|searchFormRef|searchForm 的 form 对象|Object|-|
|query|重新获取列表数据|Function(params, reset)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用
