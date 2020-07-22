---
title: toast
---

## toast

基于 message 的二次封装

```jsx
import React from 'react';
import { Button, Row, Col } from 'antd';
import toast from './index';

export default () => {
  return(
    <Row>
      <Col span={8}>
        <Button
          onClick={() => {
            toast({ text: 'success' })
          }}
        >
          success
        </Button>
      </Col>
      <Col span={8}>
        <Button
          onClick={() => {
            toast({
              type: 'error',
              text: 'error',
            })
          }}
        >
          error
        </Button>
      </Col>
      <Col span={8}>
        <Button
          onClick={() => {
            toast({
              type: 'loading',
              text: 'loading',
              time: 2,
            }).then(() => {
              toast({ text: 'success' })
            })
          }}
        >
          loading.then
        </Button>
      </Col>
    </Row>
  );
}
```

## API

原 [message](https://ant-design.gitee.io/components/message-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|type|提示类型|string|success|
|text|提示内容|string|''|
|time|自动关闭的延时，单位秒。设为 0 时不自动关闭。|number|3|

> 注意：在 message.config 中 maxCount 自动设置为了 1。如果需要不同的配置，请自行设置。[配置](https://ant-design.gitee.io/components/message-cn/#message.config)
