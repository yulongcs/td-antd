---
title: isPromise
---

## isPromise

判断对象是否为 promise 对象

## 代码演示

```jsx
import React from 'react';
import { Button } from 'antd';
import { tools } from 'td-antd';

const { isPromise } = tools;

export default () => {

  return (
    <Button
      onClick={() => {
        const bool = isPromise((new Promise((resolve) => {
          resolve();
        })));
        alert(bool);
      }}
    >
      判断
    </Button>
  );
}
```
