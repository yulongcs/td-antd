---
title: useDebounce
---

## useDebounce

hooks 版的防抖函数

## 代码演示

```jsx
/**
 * title: 基础用法
 * desc: 点击结束后 2s 弹出 alert，多次点击只会弹一次
 */
import React from 'react';
import { Button } from 'antd';
import { tools } from 'td-antd';

const { useDebounce } = tools;

export default () => {
  const onClick = useDebounce(() => {
    alert('2s 后弹出');
  }, 2000)

  return (
    <Button onClick={onClick}>
      按钮
    </Button>
  );
}
```

## API

function(fn, delay, dep)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|fn|需要执行的函数|function|-|
|delay|延迟时间，毫秒数|Number|600|
|dep|依赖项，改变时会重新返回回调函数|Array|[]|
