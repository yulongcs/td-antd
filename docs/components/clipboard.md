---
title: Clipboard
---

## Clipboard

复制组件，使用 [tools.clipboard](/tools/clipboard) 封装

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { Clipboard } from 'td-antd';

export default () => {
  return (
    <>
      <Clipboard disabled text="我住长江头，君住长江尾。日日思君不见君，共饮长江水。" />
      <br />
      <br />
      <Clipboard text="我住长江头，君住长江尾。日日思君不见君，共饮长江水。" />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|text|需要复制的文本信息|String|-|
|disabled|禁用|Boolean|false|
