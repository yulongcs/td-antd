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
      onChange={(value) => { console.log(value) }}
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
      onChange={(value) => { console.log(value) }}
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
      onChange={(value) => { console.log(value) }}
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

```jsx
/**
 * title: 进阶用法
 * desc: 自定义下拉框内容。filterOptionChildren 和 optionLabelProp 属性进行搭配使用。
 */
import React from 'react';
import { SelectMap } from 'td-antd';

const national = {
  china: '🇨🇳',
  usa: '🇺🇸',
  japan: '🇯🇵',
  korea: '🇰🇷',
};

export default () => {
  return (
    <SelectMap
      mode="multiple"
      style={{ width: '40%' }}
      fields={['value', 'label']}
      optionLabelProp="label"
      onChange={(value) => { console.log(value) }}
      filterOptionChildren={(item) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label={item.label} style={{ paddingRight: 4 }}>
            {national[item.value]}
          </span>
          {item.label}
        </div>
      )}
      data={[
        {
          value: 'china',
          label: 'China',
        }, {
          value: 'usa',
          label: 'Usa',
          disabled: true,
        }, {
          value: 'japan',
          label: 'Japan',
        }, {
          value: 'korea',
          label: 'Korea',
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
|fields|当数据成员是 [object Object] 类型时，需要申明渲染字段|[String, String]|-|
|filterOptionChildren|搭配数据类型为 [object Object] 时使用，自定义渲染下拉框内容 |function(item, index)|-|

> 注意：默认宽度是 100%
