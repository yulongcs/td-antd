---
title: SelectMap
---

## SelectMap

基于 Select 的二次封装

## 代码演示

```jsx
/**
 * title: 基础用法-1
 * desc: 数据是数组字符串，如：['Jack', 'Lucy', 'Sam', 'Andy']
 */
import React from 'react';
import { SelectMap } from 'td-antd';

export default () => {
  return (
    <SelectMap
      style={{ width: 400 }}
      data={['Jack', 'Lucy', 'Sam', 'Andy']}
    />
  );
}
```

```jsx
/**
 * title: 基础用法-2
 * desc: 数据是普通对象，如：{ key1:'Jack', key2:'Lucy' }
 */
import React from 'react';
import { SelectMap } from 'td-antd';

export default () => {
  return (
    <SelectMap
      style={{ width: 350 }}
      data={{ key1: 'Jack', key2: 'Lucy' }}
    />
  );
}
```

```jsx
/**
 * title: 基础用法-3
 * desc: 数据是数组对象，如：[{ name:'Jack', id:18 }, { name:'Lucy', id:20 }]。注意，只有该类型的用法可以设置 [Select.Option](https://ant-design.gitee.io/components/select-cn/#Option-props) 的属性
 */
import React from 'react';
import { SelectMap } from 'td-antd';

export default () => {
  return (
    <SelectMap
      style={{ width: 350 }}
      fields={['id', 'name']}
      data={[
        {
          name: 'Jack',
          id: 18,
          disabled: true
        }, {
          name: 'Lucy',
          id: 20
        }
      ]}
    />
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
