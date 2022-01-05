---
title: DrawerBox
---

## DrawerBox

基于 Drawer 的二次封装，通过 refs 调用组件函数来打开浮层。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { DrawerBox } from 'td-antd';

export default () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => { ref.current.visible(true) }}>打开抽屉</Button>
      <DrawerBox
        ref={ref}
        width={400}
        title="demo"
        placement="left"
        buttonPosition="center"
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
      </DrawerBox>
    </React.Fragment>
  );
}
```

```jsx
/**
 * title: 自定义页脚
 * desc: 注意，自定义 footer 后，将无法使用属性 onOk、onCancel、okText、cancelText、okButtonProps、cancelButtonProps、confirmLoading、buttonPosition
 */
import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import { DrawerBox } from 'td-antd';

export default () => {
  const ref = useRef();

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => { ref.current.visible(true) }}>自定义页脚</Button>
      <DrawerBox
        ref={ref}
        width={400}
        title="demo"
        footer={
          <div style={{ textAlign: 'left' }}>
            <Space>
              <Button danger>删除</Button>
              <Button type="primary">确定</Button>
            </Space>
          </div>
        }
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
|confirmLoading|确定按钮和内容部分的 loading|Boolean|false|
|buttonPosition|页脚按钮的位置|left、center、right|'right'|

## Ref

使用 ref.current.visible() 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|visible|浮层展示/隐藏|Function(Boolean)|-|
