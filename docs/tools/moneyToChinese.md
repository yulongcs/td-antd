---
title: moneyToChinese
---

## moneyToChinese

将财务数字转为大写中文，最多支持到小数点后四位。

### 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { Input } from 'antd';
import { tools } from 'td-antd';

const { moneyToChinese } = tools;

export default () => {
  const [text, setText] = useState('');

  return (
    <>
      <Input.Search
        placeholder="请输入金额"
        style={{ width: 300 }}
        onSearch={(value) => {
          setText(moneyToChinese(value));
        }}
      />
      <br />
      <pre style={{ display: 'inline-block', marginTop: 12 }}>
        {text}
      </pre>
    </>
  );
}
```

```jsx
/**
 * title: 测试用例
 */
import React from 'react';
import { tools } from 'td-antd';

const { moneyToChinese } = tools;

export default () => {
  return (
    <>
      <p>示例1：moneyToChinese(null) => {moneyToChinese(null)}</p>
      <p>示例2：moneyToChinese(undefined) => {moneyToChinese(undefined)}</p>
      <p>示例3：moneyToChinese(0) => {moneyToChinese(0)}</p>
      <p>示例4：moneyToChinese(0.1) => {moneyToChinese(0.1)}</p>
      <p>示例5：moneyToChinese(0.12) => {moneyToChinese(0.12)}</p>
      <p>示例6：moneyToChinese(0.123) => {moneyToChinese(0.123)}</p>
      <p>示例7：moneyToChinese(0.1234) => {moneyToChinese(0.1234)}</p>
      <p>示例8：moneyToChinese(123456) => {moneyToChinese(123456)}</p>
      <p>示例9：moneyToChinese(123456.1) => {moneyToChinese(123456.1)}</p>
      <p>示例10：moneyToChinese(123456.12) => {moneyToChinese(123456.12)}</p>
      <p>示例11：moneyToChinese(123456.123) => {moneyToChinese(123456.123)}</p>
      <p>示例12：moneyToChinese(123456.1234) => {moneyToChinese(123456.1234)}</p>
    </>
  );
}
```
