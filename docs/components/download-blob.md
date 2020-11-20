---
title: DownloadBlob
---

## DownloadBlob

[tools.downloadBlob](/tools/download-blob) 函数的组件，自带 loading 效果

## 代码演示

```jsx
import React from 'react';
import { DownloadBlob } from 'td-antd';

export default () => {
  return(
    <DownloadBlob /> 
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址|String|-|
|filename|下载后的文件名|String|默认使用后端在 Content-Disposition 中包装好的名称|
|body|使用该参数会将请求变为 POST，且为 入参|Object|-|
