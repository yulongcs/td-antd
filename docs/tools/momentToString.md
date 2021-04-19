---
title: momentToString
---

## momentToString

moment 和 string 之间的转换，默认格式为 YYYY-MM-DD。如果 value 对象是 moment，则会转为 format 的格式日期，反之亦然

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { tools } from 'td-antd';

const { momentToString } = tools;

export default () => {
  const [time, setTime] = useState('');
  const onChange = (date, dateString) => {
    setTime(momentToString(date));
  };

  return (
    <>
      <DatePicker
        onChange={onChange}
        defaultValue={momentToString('2020-11-11')}
      />
      <div style={{ paddingTop: 12 }}>{time}</div>
    </>
  );
}
```

## API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的数据，moment/format|Object/String|-|
|param2|format的格式|String|YYYY-MM-DD|
