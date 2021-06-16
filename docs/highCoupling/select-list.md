---
title: SelectList
---

## SelectList

基于 Select 封装的下拉框组件，支持分页请求和搜索数据。可用于 Form 的受控组件

## 代码演示

```jsx
/**
 * title: 分页请求
 */
import React from 'react';
import { localConfig, SelectList } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/95250/get/api/terminal/qryByPage.json"
      pageSize={10}
      searchField="label"
      fields={['id', 'label']}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

```jsx
/**
 * title: 接口不分页
 */
import React from 'react';
import { localConfig, SelectList } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  return (
    <SelectList
      style={{ width: 240 }}
      url="http://rap2api.taobao.org/app/mock/95250/get/api/terminal/qry.json"
      pageSize={null}
      searchField="label"
      fields={['id', 'label']}
      placeholder="请选择随机生成的项，支持搜索"
    />
  );
}
```

## API

支持原 [Select](https://ant-design.gitee.io/components/select-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址，由于内置使用 request 是从 localConfig 中获取的，不必再使用 proxy|String|-|
|method|请求方式|"GET" \| "POST"|"GET"|
|pageSize|不分页接口请设置`falsely`，影响默认请求参数和返回数据结构|Number|50|
|fields|`Select.Option`的`key`和`value`，没有传入直接取数据项|[String, String]|-|
|defaultData|默认Select选项，有默认选项不再主动请求数据|Array|[]|
|defaultParams|默认请求参数|Object|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|fetchList|通常用于重置数据|Function(param, action)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用