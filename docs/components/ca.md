---
title: Ca
---

## Ca

数字证书使用协议

## 代码演示

```jsx
import React, { useRef } from 'react';
import { Ca, LinkBtn } from 'td-antd';

export default () => {
  const caRef = useRef();

  return (
    <>
      <LinkBtn onClick={() => { caRef.current.visible(true) }}>查看</LinkBtn>
      <Ca
        ref={caRef}
        onOk={() => {
          alert('确认');
        }}
      />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|subject|主体名称|String|杭州睿轶信息技术有限公司|
|updateTime|协议更新时间|String|2021年11月22日|
|effectiveTime|协议生效时间|String|2021年12月1日|
