---
title: QRcode
---

## QRcode

二维码组件，在 [qrcode.react](https://github.com/zpao/qrcode.react) 基础上扩展，支持添加 logo

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { QRcode } from 'td-antd';

export default () => {
  const [value, setValue] = useState('你并非什么事情都不做准备，起码你已经，准备好了要失败的嘛。');

  return (
    <>
      <Input
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />
      <br /><br />
      <QRcode
        value={value}
        size={200}
        img="/logo.png"
      />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|value|需要转为二维码的字符串|String|-|
|size|二维码尺寸，正方形|Number|128|
|img|logo图片，会按照一定规则进行缩放|url/base64|-|

## PS

可以通过 `ref.current.canvas().toDataURL('image/png')` 获取 base64 数据
