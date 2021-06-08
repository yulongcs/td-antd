---
title: EditTable
---

## EditTable

基于 [Table](https://ant-design.gitee.io/components/table-cn/#components-table-demo-edit-row) 封装

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { EditTable, FormItem } from 'td-antd';

export default () => {
  return (
    <EditTable
      bordered
      rowKey="id"
      onFinish={(res) => {
        console.log(res);
      }}
      dataSource={[
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
      ]}
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
|onFinish|点击保存后的回调函数|Function({ values, setEditingKey })|-|
|rowKey|列表行的唯一key|String|-|
|editText|编辑按钮文案|String|修改|
|cancelText|取消按钮文案|String|取消|
|okText|保存按钮文案|String|保存|

### columns

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|editable|是否编辑|Boolean|-|
|FormItem|表单渲染项|ReactNode|-|

