---
title: toThousands
---

## toThousands

数字与千位符数字的转化，千位符数字一般用于金融数字展示

### 代码演示

```jsx
import React from 'react';
import { tools } from 'td-antd';

const { toThousands } = tools;

export default () => {
  return (
    <>
      <p>示例1：toThousands(123456) => {toThousands(123456)}</p>
      <p>示例2：toThousands(123456.1, 2) => {toThousands(123456.1, 2)}</p>
      <p>示例3：toThousands('123456.11111', 3) => {toThousands('123456.11111', 3)}</p>
      <p>示例4：toThousands('123,456') => {toThousands('123,456')}</p>
      <p>示例5：toThousands('12345.1') => {toThousands('12345.1')}</p>
      <p>示例6：toThousands('') => {toThousands('')}</p>
    </>
  );
}
```

### API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的数据|Number/String|-|
|param2|小数的位数，当实际位数大于参数位数时，会保留实际的位数，如示例3|Number|-|

## toThousands.currency

人民币的展示，显示小数点后2位

### 代码演示

```jsx
import React from 'react';
import { tools } from 'td-antd';

const { toThousands } = tools;

export default () => {
  return (
    <>
      <p>示例1：toThousands.currency(123456) => {toThousands.currency(12345)}</p>
      <p>示例2：toThousands.currency(888.8) => {toThousands.currency(888.8)}</p>
      <p>示例3：toThousands.currency(510.4119) => {toThousands.currency(510.4119)}</p>
      <p>示例4：toThousands.currency('') => {toThousands.currency('')}</p>
      <p>示例5：toThousands.currency(0) => {toThousands.currency(0)}</p>
      <p>示例6：toThousands.currency(null) => {toThousands.currency(null)}</p>
      <p>示例7：toThousands.currency(undefined) => {toThousands.currency(undefined)}</p>
    </>
  );
}
```

### API

function(number)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|number|具体金额|Number|-|
