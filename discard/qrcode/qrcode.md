---
title: Qrcode
---

## Qrcode

将字符串转为二维码。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { Qrcode } from 'td-antd';

export default () => {
  const qrcodeRef = useRef();
  const [value, setValue] = useState();

  return (
    <>
      <Input
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />
      <br /><br />
      <Qrcode ref={qrcodeRef} value={value} size={200} />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|value|需要转为二维码的字符串|String|-|
|size|二维码尺寸，正方形|Number|128|
