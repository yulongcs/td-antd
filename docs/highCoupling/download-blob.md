---
title: DownloadBlob
---

## DownloadBlob

文件流下载的包裹组件

## 代码演示

```jsx
/**
 * title: 组件用法
 */
import React, { useState } from 'react';
import { Space, Switch } from 'antd';
import { DownloadBlob, LinkBtn } from 'td-antd';

export default () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Switch
        defaultChecked
        checkedChildren="启用"
        unCheckedChildren="禁用"
        onChange={(d) => setDisabled(!d)}
      />
      <br /><br />
      <Space>
        <DownloadBlob
          disabled={disabled}
          url="/demo.jpg"
          filename="demo.jpeg"
        >
          下载
        </DownloadBlob>
        <DownloadBlob
          disabled={disabled}
          url="/demo.jpg"
          filename="demo.jpeg"
        >
          <LinkBtn onClick={() => console.log(2222)}>下载2</LinkBtn>
        </DownloadBlob>
      </Space>
    </>
  );
}
```

```jsx
/**
 * title: 函数用法
 */
import React, { useState } from 'react';
import { Space, Switch } from 'antd';
import { DownloadBlob, LinkBtn } from 'td-antd';

const [downloadBlob] = DownloadBlob.use();

export default () => {
  return (
    <LinkBtn
      onClick={() => {
        downloadBlob({
          url: '/demo.jpg',
          filename: 'demo.jpeg',
        });
      }}
    >下载
    </LinkBtn>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址|String|-|
|filename|下载后的文件名|String|默认使用后端在 Content-Disposition 中包装好的名称|
|body|使用该参数会将请求变为 POST，且为 入参|Object|-|
|disabled|是否禁用|Boolean|false|
