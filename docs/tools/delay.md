---
title: delay
---

## delay

在指定毫秒数后调用函数，并将附加参数传给函数。

```jsx
import React from 'react';
import { Button } from 'antd';
import { tools } from 'components';

const { delay } = tools;

export default () => {
  return (
    <Button
      onClick={() => {
        delay((text) => {
          alert(text);
        }, 3000, 'later')
      }}
    >
      3秒后执行
    </Button>
  );  
}
```

## API

function(param1, param2, param3)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|在指定毫秒数后调用的函数|Function(param3)|-|
|param2|毫秒数|Number|0|
|param3|附加参数，在param1执行的函数中可获得|-|-|
