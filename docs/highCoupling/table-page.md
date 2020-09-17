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
      defaultParams={{ extra: '额外的参数' }}
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

```jsx
/**
 * title: 多 tab 栏用法
 * desc: 当切换 tab 栏时，根据指定参数请求列表数据，并重新渲染搜索栏
 */
 
import React, { useState, useRef } from 'react';
import { Row, Col, Table, Button, DatePicker, Tabs } from 'antd';
import { TablePage, SelectMap, FormItem } from 'td-antd';

export default () => {
  const tablePageRef = useRef();

  return (
    <>
      <Tabs
        onChange={(key) => {
          tablePageRef.current.query({
            status: key,
          }, true)
          tablePageRef.current.searchFormRef.resetFields(); // 重置搜索栏
          tablePageRef.current.searchFormRef.setFieldsValue({ status: key }); // 设置搜索栏
        }}
      >
        <Tabs.TabPane tab="全部" key="全部" />
        <Tabs.TabPane tab="已删除" key="已删除" />
        <Tabs.TabPane tab="仓库中" key="仓库中" />
      </Tabs>
      <TablePage
        url="/aaa.json"
        ref={tablePageRef}
        defaultParams={{ extra: '额外的参数' }}
        extra={<Button type="primary">新增</Button>}
        searchReturn={(values) => {
          console.log(values);
          
          return values;
        }}
        searchFormProps={{
          children: (formProps) => (
            <>
              <Col span={6}>
                <FormItem
                  {...formProps}
                  fieldName="productName"
                  inputProps={{ placeholder: '产品名称' }}
                />
              </Col>
              <Col span={6}>
                <FormItem
                  {...formProps}
                  fieldName="status"
                >
                  <SelectMap placeholder="状态" data={['全部', '已删除', '仓库中']} />
                </FormItem>
              </Col>
            </>
          ),
        }}
      />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|列表请求地址。由于内置使用 request 是从 localConfig 中获取的，不必再使用 proxy |String|-|
|method|请求模式，GET/POST|String|GET|
|tableProps|支持原 [Table](https://3x.ant.design/components/table-cn/) 的 API|Object|{}|
|columns|表格列的配置描述，同原 Table 组件|ColumnProps[]|[]|
|searchFormProps|SearchForm 组件的属性|Object|{}|
|searchReturn|自定义搜索栏的回调函数，必须返回结果对象给组件以供搜索使用|Function(values)|-|
|defaultParams|默认参数，一般是不变的|Object|{}|
|success|请求成功后的回调函数|Function({ values = [] })|-|
|extra|在搜索栏和列表中间的额外节点项|ReactNode|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|searchFormRef|searchForm 的 form 对象|Object|-|
|query|重新获取列表数据|Function(params, reset)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用
