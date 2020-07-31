---
title: toThousands
---

## toThousands

数字与千位符数字的转化，千位符数字一般用于金融数字展示

```jsx
import React, { useEffect } from 'react';
import { tools } from 'components';

const { toThousands } = tools;

export default () => {
  return (
    <>
      <p>{toThousands(123456)}</p>
      <p>{toThousands(123456, 2)}</p>
      <p>{toThousands('123456.1', 3)}</p>
      <p>{toThousands('123,456')}</p>
    </>
  );
}
```

## API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的数据|Number/String|-|
|param2|小数的位数|Number|0|
