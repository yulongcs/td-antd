---
title: HandleBox
---

## HandleBox

通常用于 Table 组件的操作栏，将操作按钮隔开。该组件只对 a、button 标签起作用。

## 代码演示

```jsx
/**
 * title: 子元素是 a
 */
import React from 'react';
import { LinkBtn, HandleBox } from 'td-antd';

export default () => {
  return (
    <HandleBox>
      <LinkBtn>btn1</LinkBtn>
      <LinkBtn>btn2</LinkBtn>
    </HandleBox>
  );
}
```

```jsx
/**
 * title: 子元素是 button
 */
import React from 'react';
import { Button } from 'antd';
import { LinkBtn, HandleBox } from 'td-antd';

export default () => {
  return (
    <HandleBox>
      <Button>btn1</Button>
      <Button>btn2</Button>
    </HandleBox>
  );
}
```
