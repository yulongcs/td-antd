---
title: DragModal
---

## DragModal

基于 Modal 的二次封装，可拖拽的浮层

```jsx
import React, { useState } from 'react';
import DragModal from './index';
import LinkBtn from '../link-btn';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  
  return (
    <React.Fragment>
      <LinkBtn onClick={() => { setVisible(true) }}>Show-1</LinkBtn>
      <br/>
      <LinkBtn onClick={() => { setVisible2(true) }}>Show-2</LinkBtn>
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
