---
title: EmptyBox
---

## EmptyBox

基于 Empty 的二次封装，可灵活的展示空数据的表现

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { EmptyBox } from 'td-antd';

export default () => {
  const [show, setShow] = useState(true);

  return (
    <React.Fragment>
      <Button
        onClick={() => { setShow(!show) }}
      >{show ? '有数据' : '无数据'}
      </Button>
      <EmptyBox show={show}>
          展示内容
      </EmptyBox>
    </React.Fragment>
  );
}
```

## API

支持原 [Empty](https://3x.ant.design/components/empty-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|show|是否展示空数据|Boolean|true|
