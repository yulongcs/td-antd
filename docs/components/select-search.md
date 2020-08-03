---
title: SelectSearch
route: /selectSearch
menu: 组件
---

## SelectSearch

基于 Select 封装的带接口搜索的下拉框组件。可用于 Form 的受控组件

```jsx
import React from 'react';
import { Row, Col } from 'antd';
import { SelectSearch } from 'td-antd';

export default () => {
  return (
    <>
      <SelectSearch
        allowClear
        placeholder="输入数字，单选"
        fields={['cell', 'phone']}
        // 使用公共接口进行测试
        url="https://randomuser.me/api/?results="
        afterFetch={res => res.results}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <br />
      <br />
      <SelectSearch
        isData
        allowClear
        mode="multiple"
        placeholder="输入数字，多选"
        fields={['cell', 'phone']}
        // 使用公共接口进行测试
        url="https://randomuser.me/api/?results="
        afterFetch={res => res.results}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </>
  );
}
```

## API

支持原 [Select](https://ant-design.gitee.io/components/select-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址，请带上请求参数，如：`/xxx/xxx.json?keywords=` 只支持 get 请求|String|-|
|placeholder|提示文案|String|-|
|fields|渲染需要的字段`[key, label]`|Array|-|
|onChange|选择后的回调函数，单选时返回普通对象，多选时返回数组|Function(Array/Object)|-|
|afterFetch|请求成功后需要返回给组件的列表数据|(res) => (res.list)|-|
|customOption|自定义渲染下拉框内容|Function(record)|-|
|isData|是否返回所选项的完整数据，如果 true，则 onChange 返回的是对象字符串|Boolean|false|

> 注意：默认宽度是 100%
