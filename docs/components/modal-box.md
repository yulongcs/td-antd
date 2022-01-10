---
title: ModalBox
---

## ModalBox

基于 Modal 的二次封装，通过 refs 调用组件函数来打开浮层。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { ModalBox, LinkBtn } from 'td-antd';

export default () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  return(
    <React.Fragment>
      <Button type="primary" onClick={() => { ref.current.visible(true) }}>show</Button>
      <ModalBox
        title="demo"
        ref={ref}
        confirmLoading={loading}
        onOk={() => {
          alert('ok');
          ref.current.visible(false);
        }}
        onCancel={() => {
          ref.current.visible(false);
          setLoading(false);
        }}
      >
        <Button type="primary" onClick={() => { setLoading('内容加载中...') }}>Loading</Button>
      </ModalBox>
    </React.Fragment>
  );
}
```

```jsx
/**
 * title: 按钮位置调整
 * desc: 使用 buttonPosition 来调整页脚按钮的位置，且不显示取消按钮
 */
import React, { useRef } from 'react';
import { Button } from 'antd';
import { ModalBox, LinkBtn } from 'td-antd';

export default () => {
  const ref = useRef();

  return(
    <React.Fragment>
      <Button type="primary" onClick={() => { ref.current.visible(true) }}>show</Button>
      <ModalBox
        title="demo"
        ref={ref}
        buttonPosition="center"
        onOk={() => { alert('ok') }}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { marginLeft: 0 } }}
        bodyStyle={{ maxHeight: 300 }}
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
|buttonPosition|页脚按钮的位置|left、center、right|'right'|

## Ref

使用 ref.current.visible() 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|visible|浮层展示/隐藏|Function(Boolean)|-|

## FAQ

### 为什么不能修改 body 的高度

可以使用 bodyStyle: { maxHeight: 300 } 来修改你想要的高度，默认高度是 520px。
