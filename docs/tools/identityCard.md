---
title: identityCard
---

## identityCard

获取身份证号码中的信息内容；
注意，只支持 18 位的身份证号码；

## 代码演示

```jsx
import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { tools, toast } from 'td-antd';

const { identityCard } = tools;

export default () => {
  const [id, setId] = useState('34262519620211099X');

  return (
    <>
      <Input
        value={id}
        placeholder="请输入身份证号码"
        onChange={({ target }) => {
          setId(target.value)
        }}
      />
      <br/>
      <br/>
      <Space>
        <Button
          onClick={() => {
            alert(identityCard(id).gender());
          }}
        >
          获取性别
        </Button>
        <Button
          onClick={() => {
            alert(identityCard(id).age());
          }}
        >
          获取年龄
        </Button>
        <Button
          onClick={() => {
            alert(JSON.stringify(identityCard(id).all()));
          }}
        >
          获取全部
        </Button>
      </Space>
    </>
  );
}
```

## 使用方法

```
// 获取性别；1 = 男，0 = 女
identityCard(id).gender()

// 获取年龄
identityCard(id).age()

// 获取生日
identityCard(id).birth()

// 获取全部
identityCard(id).all()
```
