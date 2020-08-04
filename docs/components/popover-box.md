---
title: PopoverBox
---

## PopoverBox

基于 Popover 的二次封装。

## 代码演示

```jsx
import React, { useRef, useState } from 'react';
import { PopoverBox, LinkBtn, HandleBox } from 'td-antd';

export default () => {
  const ref = useRef();
  const ref2 = useRef();
  const [loading, setLoading] = useState(false);

  return(
    <HandleBox>
      <PopoverBox
        ref={ref}
        title="title"
        content="这里是内容"
        onOk={() => {
          console.log('Ok')
          setLoading(true);
        }}
        onCancel={() => {
          setLoading(false);
          ref.current.visible(false);
        }}
        confirmLoading={loading}
      >
        <LinkBtn onClick={() => { ref.current.visible(true) }}>Show1</LinkBtn>
      </PopoverBox>
      <PopoverBox
        title="title"
        placement="right"
        content="这里是内容"
      >
        <LinkBtn>Show2</LinkBtn>
      </PopoverBox>
    </HandleBox>
  );
}
```

## API

支持原 [Popover](https://ant-design.gitee.io/components/popover-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onOk|点击确认按钮的回调函数|Function||
|onCancel|点击取消按钮的回调函数|Function||
|okText|确认按钮的文案|String|确定|
|cancelText|取消按钮的文案|String|取消|
|okButtonProps|确定按钮的属性|Object|{}|
|cancelButtonProps|取消按钮的属性|Object|{}|
|confirmLoading|确定按钮 loading|Boolean|-|

## Ref

使用 ref.current.visible() 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|visible|浮层展示/隐藏|Function(Boolean)|-|
