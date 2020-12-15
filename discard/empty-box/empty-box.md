---
title: EmptyBox
---

## EmptyBox

基于 Empty 的二次封装，可灵活的展示空数据的表现

## 代码演示

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
      <br />
      <br />
      <EmptyBox show={show}>
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg" />
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
