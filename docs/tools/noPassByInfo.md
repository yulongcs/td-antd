---
title: noPassByInfo
---

## noPassByInfo

信息脱敏，支持：手机号、姓名、邮箱、身份证

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
      <p>身份证脱敏：{noPassByInfo('33032119971122072X')}</p>
      <p>身份证脱敏：{noPassByInfo('诸葛龙')}</p>
    </>
  );
}
```

## API

function(param1)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的字符串|String|-|
