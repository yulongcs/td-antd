---
title: DescList
---

## DescList

基于 Descriptions 的二次封装，通常用于详情信息的展示。

## 代码演示

```jsx
/**
 * title: 基础用法
 * desc: 使用 pre 导致文本超出时，设置样式 whiteSpace="normal"
 */
import React, { useState, useEffect } from 'react';
import { DescList } from 'td-antd';

export default () => {
  const [dataSource, setDataSource] = useState({
    name: 'andy',
    age: 18,
    address: '树上第三根叉',
    phone: '138xxxxxxxx',
    email: 'xxx@xxx.com',
    desc: {
      code: 1,
      text: 'dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法'
    },
  });

  return (
    <DescList
      column={2}
      dataSource={dataSource}
      columns={[
        {
          title: '名字',
          dataIndex: 'name',
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '地址',
          dataIndex: 'address',
        }, {
          title: '电话',
          render: record => record.phone,
        }, {
          title: '描述',
          dataIndex: 'desc.text',
          render: (t, r) => <pre style={{ whiteSpace: 'normal' }}>{t}</pre>,
          span: 2,
        }, {
          title: '地址',
          dataIndex: 'address',
        }, {
          title: '邮箱',
          dataIndex: 'email',
        }
      ]}
    />
  );
}
```

```jsx
/**
 * title: 基础用法-2
 * desc: 使用 visible 控制字段的展示/隐藏
 */
import React, { useState, useEffect } from 'react';
import { DescList } from 'td-antd';

export default () => {
  const [dataSource, setDataSource] = useState({
    name: 'andy',
    age: 18,
    address: '树上第三根叉',
    phone: '138xxxxxxxx',
    email: 'xxx@xxx.com',
    desc: {
      code: 1,
      text: 'dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法'
    },
  });

  return (
    <DescList
      column={2}
      dataSource={dataSource}
      columns={[
        {
          title: '名字',
          dataIndex: 'name',
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '地址',
          dataIndex: 'address',
        }, {
          title: '电话',
          render: record => record.phone,
        }, {
          title: '描述',
          dataIndex: 'desc.text',
          render: (t, r) => <pre style={{ whiteSpace: 'normal' }}>{t}</pre>,
          span: 2,
           visible: false,
        }, {
          title: '地址被隐藏了',
          dataIndex: 'address',
        }, {
          title: '邮箱被隐藏了',
          dataIndex: 'email',
          visible: () => {},
        }
      ]}
    />
  );
}
```

```jsx
/**
 * title: 进阶用法
 * desc: 使用 url 进行数据请求
 */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { DescList, localConfig } from 'td-antd';
import request from '../../utils/request';

localConfig.config({ request });

export default () => {
  const ref = useRef();

  return (
    <>
      <Button type="primary" onClick={() => { ref.current.query() }} style={{ marginBottom: 12 }}>重新请求数据</Button>
      <DescList
        column={2}
        bordered
        ref={ref}
        url="/app/mock/288350/desclist/001.json"
        columns={[
          {
            title: '名字',
            dataIndex: 'name',
          }, {
            title: '年龄',
            dataIndex: 'age',
          }, {
            title: '职业',
            dataIndex: 'occupation',
          }, {
            title: '地址',
             dataIndex: 'address',
          }, {
            title: '描述',
            dataIndex: 'desc',
          }
        ]}
      />
    </>
  );
}
```

## API

支持原 [Descriptions](https://ant-design.gitee.io/components/descriptions-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|当url开启时，会进行异步请求，调用[localConfig.request](/high-coupling/local-config)|String|-|
|callback|当异步请求成功后的回调函数|Function(res)|-|
|dataSource|数据源，当不进行异步请求时，可直接进行数据传递|Object|{}|
|columns|列描述数据对象|Array|[]|
|defaultValue|当值为空时，默认展示的值|String|'--'|

### columns

支持原 [DescriptionItem](https://ant-design.gitee.io/components/descriptions-cn/#DescriptionItem) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|label展示的值|String\|ReactNode|-|
|dataIndex|数据在数据项中对应的 key，支持嵌套写法如`key.key`或数组路径如`['key', 'key']`|String\|String[]|-|
|visible|是否显示，默认显示；如果是函数时，必须返回布尔值|Boolean\|Function(record)|true|
|render|生成复杂数据的渲染函数|Function(text, record) {}|-|
|defaultValue|当值为空时，默认展示的值，优先级高于组件的`defaultValue`|String|-|
|span|包含列的数量|Number|1|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|query|重新获取数据，url必须存在|Function()|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用
