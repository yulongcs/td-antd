---
title: Reject
---

## Reject

用于 "拒绝原因填写" 之类的场景

## 代码演示

```jsx
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { Reject, LinkBtn } from 'td-antd';

export default () => {
  return (
    <Space>
      <Reject
        min={30}
        title="退回原因"
        placeholder="请输入退回原因，不能少于30个字符"
        onOk={(value, setVisible, setLoading) => {
          setLoading(true);
          setTimeout(() => {
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
        onOk={(value, setVisible, setLoading) => {
          setLoading(true);
          setTimeout(() => {
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

## API

支持原 [Popover](https://ant-design.gitee.io/components/popover-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onOk|点击确认按钮的回调函数|Function(value, setVisible, setLoading)|-|
|min|最少需要的字符数|Number|-|
