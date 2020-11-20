---
title: toThousands
---

## toThousands

数字与千位符数字的转化，千位符数字一般用于金融数字展示

### 代码演示

```jsx
import React, { useEffect } from 'react';
import { tools } from 'td-antd';

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

### API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的数据|Number/String|-|
|param2|小数的位数|Number|0|

## toThousands.currency

人民币的展示，显示小数点后2位

### 代码演示

```jsx
import React, { useEffect } from 'react';
import { tools } from 'td-antd';

const { toThousands } = tools;

export default () => {
  return (
    <>
      <p>人民币金额展示：{toThousands.currency(12345)}</p>
    </>
  );
}
```

### API

function(number)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|number|具体金额|Number|-|
