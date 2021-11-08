---
title: clipboard
---

## clipboard

复制内容到剪贴板

## 代码演示

```jsx
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { tools, toast } from 'td-antd';

const { clipboard } = tools;

export default () => {
  const [text, setText] = useState('我住长江头，君住长江尾。日日思君不见君，共饮长江水。');

  return (
    <>
      <Input.TextArea value={text} onChange={({ target }) => { setText(target.value) }} placeholder="请输入文字" />
      <Button
        style={{ marginTop: 12 }}
        onClick={() => {
          clipboard(text).then(() => {
            toast({ text: '复制成功' })
          });
        }}
      >
        复制
      </Button>
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|text|需要复制的文本入参|String|-|

PS：复制成功后返回一个 Promise 对象
