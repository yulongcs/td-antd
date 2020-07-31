---
title: LinkBtn
---

## LinkBtn

像 a 标签一样的按钮组件，可根据 @primary-color 进行颜色变更

```jsx
import React from 'react';
import { LinkBtn } from 'components';

export default () => {
  return(
    <React.Fragment>
      <LinkBtn onClick={() => {alert('add')}}>click</LinkBtn>
      <br/>
      <LinkBtn disabled>disabled</LinkBtn>
    </React.Fragment>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|className|样式类|String|-|
