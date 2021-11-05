---
title: NoCopyBox
---

## NoCopyBox

被组件包裹的内容无法被选中和复制。[w3c](https://www.w3school.com.cn/cssref/pr_user-select.asp)

## 代码演示

```jsx
import React, { useState, useEffect } from 'react';
import { DescList, NoCopyBox } from 'td-antd';

export default () => {
  const [dataSource, setDataSource] = useState({
    name: 'andy',
    age: 18,
    et: 0,
    address: '树上第三根叉',
    phone: '138xxxxxxxx',
    email: 'xxx@xxx.com',
    desc: {
      code: 1,
      text: 'dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法dataIndex 的嵌套写法'
    },
  });
  
  const map = {
    0: '地球人',
    1: '外星人',
  };

  return (
    <NoCopyBox>
      <DescList
        column={2}
        dataSource={dataSource}
        columns={[
          {
            title: '名字',
            dataIndex: 'name',
          }, {
            title: '星球',
            dataIndex: 'et',
            render: t => map[t],
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
    </NoCopyBox>
  );
}
```
