---
title: SearchForm
---

## SearchForm

基于 Form 的二次封装，一般用于列表页头部的搜索栏。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { DatePicker, Radio } from 'antd';
import { SearchForm } from 'td-antd';

export default () => {
  const [mode, setMode] = useState('default');

  return (
    <>
      <Radio.Group value={mode} onChange={({ target }) => { setMode(target.value) }}>
        <Radio.Button value="default">默认</Radio.Button>
        <Radio.Button value="simple">简易</Radio.Button>
      </Radio.Group>
      <br /><br />
      <SearchForm
        span={6}
        mode={mode}
        columns={[
          {
            title: '手机',
            dataIndex: 'phone',
            inputProps: { placeholder: '请输入手机号' },
            visible: false,
          }, {
            title: '地址',
            dataIndex: 'address',
          }, {
            title: '年龄',
            dataIndex: 'age',
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
    </>
  );
}
```

```jsx
/**
 * title: 多搜索项
 * desc: 当表单项过多时，会自动进行展示/收起
 */
import React from 'react';
import { DatePicker } from 'antd';
import { SelectMap, SearchForm } from 'td-antd';

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
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '状态',
          dataIndex: 'status',
          component: <SelectMap data={['很长的一个枚举值哟呵', '已完成']} />
        }, {
          title: '时间',
          dataIndex: 'date',
          component: <DatePicker style={{ width: '100%' }} />
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

```jsx
/**
 * title: 不同列数量
 * desc: 控制 span 可展示不同数量的项
 */
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { SelectMap, SearchForm } from 'td-antd';

export default () => {
  const [span, setSpan] = useState(6);

  return (
    <>
      <SelectMap
        value={span}
        data={[4,6,8]}
        style={{ width: 200 }}
        placeholder="请选择展示列"
        onChange={(key) => { setSpan(+key) }}
      />
      <br />
      <br />
      <SearchForm
        span={span}
        columns={[
          {
            title: '手机',
            dataIndex: 'phone',
            inputProps: { placeholder: '请输入手机号' },
          }, {
            title: '地址',
            dataIndex: 'address',
          }, {
            title: '年龄',
            dataIndex: 'age',
          }, {
            title: '状态',
            dataIndex: 'status',
            component: <SelectMap data={['进行中', '已完成']} />
          }, {
            title: '时间',
            dataIndex: 'date',
            component: <DatePicker style={{ width: '100%' }} />
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
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|span|栅格占位格数|Number|8|
|columns|表单项数组|Array|[]|
|callback|回调函数，返回表单内容|Function|() => {}|
|defaultCollapse|是否默认展开搜索项|Boolean|true|
|mode|模式，值为 simple 时，不展示 title|string|'default'|

### columns

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|表单的 label|String/ReactNode|-|
|dataIndex|表单的 name|String|-|
|component|Form.Item 的子元素|ReactNode|Input|
|formItemProps|表单项的属性|Object|-|
|inputProps|当component不存在时，可以对 Input 进行描述|Object|-|
|visible|字段是否可见|Boolean|true|

### callback(type, values)

```
type = query 时，表示查询
type = reset 时，表示重置
```
