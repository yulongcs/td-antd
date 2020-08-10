---
title: noPassByInfo
---

## noPassByInfo

手机号/邮箱 的信息脱敏

## 代码演示

```jsx
import React, { useEffect } from 'react';
import { tools } from 'td-antd';

const { noPassByInfo } = tools;

export default () => {
  return (
    <>
      <p>{noPassByInfo('13812345678')}</p>
      <p>{noPassByInfo('13812345678@qq.com')}</p>
    </>
  );
}
```

## API

function(param1)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的字符串|String|-|