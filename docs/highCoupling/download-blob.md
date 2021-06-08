---
title: DownloadBlob
---

## DownloadBlob

文件流下载的包裹组件

## 代码演示

```jsx
import React from 'react';
import { Space } from 'antd';
import { DownloadBlob } from 'td-antd';

export default () => {
  return (
    <Space>
      <DownloadBlob
        url="/demo.jpg"
        filename="demo.jpeg"
      >下载1
      </DownloadBlob>
      <DownloadBlob
        url="/demo.jpg"
        filename="demo.jpeg"
      >下载2
      </DownloadBlob>
    </Space>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址|String|-|
|filename|下载后的文件名|String|默认使用后端在 Content-Disposition 中包装好的名称|
|body|使用该参数会将请求变为 POST，且为 入参|Object|-|

## Function

```
const [downloadBlob] = DownloadBlob.use();
```
