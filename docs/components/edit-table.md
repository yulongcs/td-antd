---
title: EditTable
---

## EditTable

基于 [Table](https://ant-design.gitee.io/components/table-cn/#components-table-demo-edit-row) 封装的可编辑表格

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { FormItem, LinkBtn } from 'td-antd';
import EditTable from 'td-antd/edit-table';

export default () => {
  const [data, setData] = useState([
   {
     id: 1,
     name: '张三',
     age: 22,
   }, {
     id: 2,
     name: '李四',
     age: 23,
   }, {
     id: 3,
     name: '王五',
     age: 24,
   },
  ])

  return (
    <EditTable
      bordered
      size="small"
      rowKey="id"
      onFinish={({ values }) => {
        const copy = JSON.parse(JSON.stringify(data)).map(item => item.id === values.id ? values : item)
        setData(copy);
        return Promise.resolve();
      }}
      extra={<LinkBtn danger>删除</LinkBtn>}
      dataSource={data}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          editable: true,
          FormItem: <FormItem name="name" />
        },
        {
          title: '年龄',
          dataIndex: 'age',
          editable: true,
          FormItem: <FormItem name="age" itemType="number" />
        },
      ]}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onFinish|点击保存后的回调函数，返回 promise.resolve 时自动关闭编辑状态|Function({ values })|-|
|rowKey|列表行的唯一key|String|-|
|editText|编辑按钮文案|String|修改|
|cancelText|取消按钮文案|String|取消|
|okText|保存按钮文案|String|保存|
|extra|非编辑状态下额外内容，如增加一个删除按钮|ReactNode|-|

### columns

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|editable|是否编辑|Boolean|-|
|FormItem|表单渲染项|ReactNode|-|

## ref

可以使用 `ref.current.setEditingKey()` 来控制表单的编辑状态。
