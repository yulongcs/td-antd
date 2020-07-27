---
title: genNonDuplicateID
---

## genNonDuplicateID

生成唯一ID

```jsx
import React from 'react';
import { Button } from 'antd';
import genNonDuplicateID from './genNonDuplicateID.js';

export default () => {
  return (
    <Button
      onClick={() => {
        alert(genNonDuplicateID(6));
      }}
    >
      获取
    </Button>
  );
}
```

## API

function(param1)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|获取指定长度的唯一id，最长13位|Number|2|
