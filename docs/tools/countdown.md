---
title: countdown
---

## countdown

倒计时方法。使用场景：需要使用倒计时的地方，如验证码倒计时等。

## 代码演示

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { tools } from 'td-antd';

const { countdown } = tools;

export default () => {
  const [count, setCount] = useState(10);

  return (
    <Button
      style={{ width: 120 }}
      disabled={count !== 10}
      onClick={() => {
        countdown({
          defaultCount: count,
          callback: (nowCount, defaultCount) => {
            console.log(nowCount)
            setCount(nowCount);
            if (nowCount === 0) {
              setCount(defaultCount);
            }
          },
        });
      }}
    >
      {count !== 10 ? `${count}s` : '开始倒计时'}
    </Button>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|defaultCount|默认初始值|Number|60|
|callback|定时器执行的回调函数|Function(nowCount, defaultCount)|() => {}|
