---
title: SelectSearch
route: /selectSearch
menu: 组件
---

## SelectSearch

基于 Select 封装的带接口搜索的下拉框组件。可用于 Form 的受控组件

## 代码演示

```jsx
/**
 * title: 单选
 */
import React from 'react';
import { Row, Col } from 'antd';
import { SelectSearch } from 'td-antd';

export default () => {
  return (
    <SelectSearch
      allowClear
      style={{ width: 350 }}
      placeholder="输入数字"
      fields={['cell', 'phone']}
      // 使用公共接口进行测试
      url="https://randomuser.me/api/?results="
      afterFetch={res => res.results}
      onChange={(value, record) => {
        console.log(value, record);
      }}
    />
  );
}
```

```jsx
/**
 * title: 多选
 */
import React from 'react';
import { Row, Col } from 'antd';
import { SelectSearch } from 'td-antd';

export default () => {
  return (
    <SelectSearch
      allowClear
      mode="multiple"
      placeholder="输入数字"
      fields={['cell', 'phone']}
      // 使用公共接口进行测试
      url="https://randomuser.me/api/?results="
      afterFetch={res => res.results}
      onChange={(value, record) => {
        console.log(value, record);
      }}
    />
  );
}
```

## API

支持原 [Select](https://ant-design.gitee.io/components/select-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址，请带上请求参数，如：`/xxx/xxx.json?keywords=` 只支持 get 请求|String|-|
|fields|渲染需要的字段`[key, label]`|Array|-|
|onChange|选择后的回调函数，单选时返回普通对象，多选时返回数组|function(value, record)|-|
|afterFetch|请求成功后需要返回给组件的列表数据|(res) => (res.list)|-|
|customOption|自定义渲染下拉框内容|function(record)|-|
