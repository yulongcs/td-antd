---
title: InnerHtml
---

## InnerHtml

用来渲染 html 的字符串，如富文本编辑器保存的内容。超简单，你也可以用直接用 dangerouslySetInnerHTML={{ __html: xxx }} 来代替

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React from 'react';
import { InnerHtml } from 'td-antd';

export default () => {
  const html = '<div style="color: red">demo<div>';

  return (
    <InnerHtml html={html} />
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|html|需要渲染的 html 字符串|String|-|
