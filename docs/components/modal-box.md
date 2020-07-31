---
title: ModalBox
---

## ModalBox

基于 Modal 的二次封装，通过 refs 调用组件函数来打开浮层。

```jsx
import React, { useRef } from 'react';
import { ModalBox, LinkBtn } from 'components';

export default () => {
  const ref = useRef();

  return(
    <React.Fragment>
      <LinkBtn onClick={() => { ref.current.visible(true) }}>show</LinkBtn>
      <ModalBox
        title="demo"
        ref={ref}
        onOk={() => { alert('ok') }}
      >
        <div style={{ height: 1000 }}>2222</div>
      </ModalBox>
    </React.Fragment>
  );
}
```

## API

支持原 [Modal](https://ant-design.gitee.io/components/modal-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onOk|点击确认按钮的回调函数|Function||
|onCancel|点击取消按钮的回调函数|Function||

## Ref

使用 ref.current.visible() 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|visible|浮层展示/隐藏|Function(Boolean)|-|

> PS：内容区域高度最高是 500px，超出的内容会有滚动条。
