---
title: DrawerBox
---

## DrawerBox

基于 Drawer 的二次封装，通过 refs 调用组件函数来打开浮层。

## 代码演示

```jsx
import React, { useRef } from 'react';
import { Button } from 'antd';
import { DrawerBox, LinkBtn } from 'td-antd';

export default () => {
  const ref = useRef();

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => { ref.current.visible(true) }}>show</Button>
      <DrawerBox
        title="demo"
        ref={ref}
        onOk={() => { alert('ok') }}
      >
        <div style={{ height: 1000 }}>2222</div>
      </DrawerBox>
    </React.Fragment>
  );
}
```

## API

支持原 [Drawer](https://ant.design/components/drawer-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|onOk|点击确认按钮的回调函数|Function||
|onCancel|点击取消按钮的回调函数|Function||
|afterClose|完全关闭后的回调|Function||
|okText|确认按钮文字|ReactNode|确定|
|cancelText|取消按钮文字|ReactNode|取消|
|okButtonProps|ok 按钮 props|[ButtonProps](https://ant.design/components/button-cn/#API)||
|cancelButtonProps|cancel 按钮 props|[ButtonProps](https://ant.design/components/button-cn/#API)||

## Ref

使用 ref.current.visible() 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|visible|浮层展示/隐藏|Function(Boolean)|-|
