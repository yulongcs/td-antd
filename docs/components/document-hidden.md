---
title: DocumentHidden
---

## DocumentHidden

通过监听 visibilitychange 事件判断当前浏览器选项卡是否可见

## 代码演示

```jsx
/**
 * title: 基础用法
 * desc: 切换浏览器选项卡后观察控制台输出
 */
import React from 'react';
import { DocumentHidden } from 'td-antd';

export default () => {
  return (
    <DocumentHidden
      onChange={(hidden) => {
        console.log(hidden);
      }}
    >
      123
    </DocumentHidden>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onChange|切换选项卡后触发|Function(hidden)|-|
