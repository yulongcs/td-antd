---
title: HandleBox
---

## HandleBox

通常用于 Table 组件的操作栏，将操作按钮隔开。该组件只对 a、button 标签起作用。

```jsx
import React from 'react';
import { LinkBtn, HandleBox } from 'components';

export default () => {
  return (
    <HandleBox>
      <LinkBtn>btn1</LinkBtn>
      <LinkBtn>btn2</LinkBtn>
    </HandleBox>
  );
}
```
