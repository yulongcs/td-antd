---
title: getUrlParameter
---

## getUrlParameter

获取 url 中指定的参数

```jsx
import React from 'react';
import { Button } from 'antd';
import { tools } from 'components';

const { getUrlParameter } = tools;
const url = 'https://www.baidu.com?id=123&name=haha';

export default () => {

  return (
    <Button
      onClick={() => {
        alert(getUrlParameter('name', url));
      }}
    >
      获取name
    </Button>
  );
}
```

## API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要获取的参数名|String|-|
|param2|指定的 url 地址，默认为当前页面地址|String|window.location.href|
