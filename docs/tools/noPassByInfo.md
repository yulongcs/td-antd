---
title: noPassByInfo
---

## noPassByInfo

信息脱敏

## 代码演示

```jsx
import React, { useEffect } from 'react';
import { tools } from 'td-antd';

const { noPassByInfo } = tools;

export default () => {
  return (
    <>
      <p>手机号脱敏：{noPassByInfo('13812345678')}</p>
      <p>邮箱脱敏：{noPassByInfo('13812345678@qq.com')}</p>
      <p>身份证脱敏：{noPassByInfo('110101199003072172')}</p>
    </>
  );
}
```

## API

function(param1)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的字符串|String|-|
