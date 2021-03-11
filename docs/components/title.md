---
title: Title
---

## Title

带气泡提示框的分段标题。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { Title, LinkBtn } from 'td-antd';

export default () => {
  return (
    <>
      <Title name="基础设置" colon={false} />
      <Title name="基础设置" colon={false} required />
      <Title name="基础设置" required />
      <Title
        required
        colon={false}
        name="基础设置"
        tip="人与人的悲欢并不相通，我只觉得他们吵闹"
      />
      <Title
        required
        name="基础设置"
        tip="人与人的悲欢并不相通，我只觉得他们吵闹"
      />
      <Title
        required
        name="基础设置"
        colon={false}
        tip="人与人的悲欢并不相通，我只觉得他们吵闹"
        extra={<LinkBtn>查看全部内容</LinkBtn>}
      />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|name|标题名称|String / ReactNode|-|
|required|是否有必填项标示|Boolean|false|
|colon|是否有冒号|Boolean|true|
|tip|提示文案|ReactNode / () => ReactNode|-|
|extra|额外的操作区|ReactNode / () => ReactNode|-|
