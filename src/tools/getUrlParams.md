---
title: getUrlParams
---

## getUrlParams

获取 url 中所有的参数

```jsx
import React from 'react';
import { Button } from 'antd';
import getUrlParams from './getUrlParams.js';

const url = 'https://www.baidu.com?id=123&name=haha';

export default () => {

  return (
    <Button
      onClick={() => {
        alert(JSON.stringify(getUrlParams(url)));
      }}
    >
      获取
    </Button>
  );
}
```

## API

function(param1)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param2|指定的 url 地址，默认为当前页面地址|String|window.location.href|
