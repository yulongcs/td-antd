---
title: Reject
---

## Reject

用于 "拒绝原因填写" 之类的场景

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { Reject, LinkBtn } from 'td-antd';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <Space>
      <Reject
        min={30}
        title="退回原因"
        confirmLoading={loading}
        placeholder="请输入退回原因，不能少于30个字符"
        onOk={(value, setVisible) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
          }, 2000);
        }}
      >
        <Button>拒绝</Button>
      </Reject>
      <Reject
        min={30}
        title="退回原因"
        placeholder="请输入退回原因，不能少于30个字符"
        onOk={(value, setVisible) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
          }, 2000);
        }}
      >
        <LinkBtn>拒绝</LinkBtn>
      </Reject>
    </Space>
  );
}
```

```jsx
/**
 * title: Ref 用法
 */
import React, { useRef, useState } from 'react';
import { Reject, LinkBtn } from 'td-antd';

export default () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LinkBtn
        onClick={() => {
          ref.current.visible(true);
        }}
      >拒绝</LinkBtn>
      <Reject
        ref={ref}
        min={10}
        title="退回原因"
        confirmLoading={loading}
        placeholder="请输入退回原因，不能少于10个字符"
        onOk={(value, setVisible) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
          }, 2000);
        }}
      />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onOk|点击确认按钮的回调函数|Function(value, setVisible)|-|
|min|最少需要的字符数|Number|-|
|max|最多字符数限制|Number|200|

## Ref

```
ref.current.visible(true);
```
