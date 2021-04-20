---
title: SelectMap
---

## SelectMap

基于 Select 的二次封装

## 代码演示

```jsx
import React from 'react';
import { SelectMap } from 'td-antd';

export default () => {
  return (
    <>
      <SelectMap
        placeholder="数据：对象"
        style={{ width: 350 }}
        data={{ key1: 'Jack', key2: 'Lucy' }}
      />
      <br />
      <br />
      <SelectMap
        placeholder="数据：数组字符串"
        style={{ width: 350 }}
        data={['Jack', 'Lucy']}
      />
      <br />
      <br />
      <SelectMap
        placeholder="数据：数组对象"
        style={{ width: 350 }}
        fields={['id', 'text']}
        data={[{ text: 'Jack', id: 18 }, { text: 'Lucy', id: 20 }]}
      />
      <br />
      <br />
      <SelectMap
        placeholder="数据：数组对象(含禁用)"
        style={{ width: 350 }}
        fields={['id', 'text']}
        data={[{ text: 'Jack', id: 18 , disabled: true}, { text: 'Lucy', id: 20, disabled: false}]}
      />
    </>
  );
}
```

## API

支持原 [Select](https://ant-design.gitee.io/components/select-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|data|渲染所需要的数据源|Object/Array|-|
|fields|当 data 为数组时，且数组成员为对象时，需要申明渲染字段|[String, String]|-|

> 注意：默认宽度是 100%
