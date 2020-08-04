---
title: DragModal
---

## DragModal

基于 Modal 的二次封装，可拖拽的浮层

## 代码演示

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { DragModal, LinkBtn } from 'td-antd';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  
  return (
    <React.Fragment>
      <Button onClick={() => { setVisible(true) }}>Show-1</Button>
      <br/>
      <br/>
      <Button onClick={() => { setVisible2(true) }}>Show-2</Button>
      <DragModal title="Modal-1" visible={visible} onCancel={() => setVisible(false)}>
        这里是内容哟
      </DragModal>
      <DragModal title="Modal-2" visible={visible2} onCancel={() => setVisible2(false)} />
    </React.Fragment>
  )
}
```

## API

支持原 [Modal](https://ant-design.gitee.io/components/modal-cn/) API
