---
title: getUrlParameter
---

## getUrlParameter

获取 url 中的参数

## 代码演示

```jsx
/**
 * title: 获取指定参数
 */
import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { tools } from 'td-antd';

const { getUrlParameter } = tools;
const url = 'https://www.baidu.com?id=123&name=haha';

export default () => {
  const ref = useRef();

  return (
    <>
      <Input placeholder="请输入url" ref={ref} defaultValue={url} />
      <br /> <br />
      <Button
        onClick={() => {
          const params = getUrlParameter('name', ref.current.state.value);
          alert(JSON.stringify(params));
        }}
      >
        获取name
      </Button>
    </>
  );
}
```

```jsx
/**
 * title: 获取全部参数
 */
import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { tools } from 'td-antd';

const { getUrlParameter } = tools;
const url = 'https://www.baidu.com?id=123&name=haha';

export default () => {
  const ref = useRef();

  return (
    <>
      <Input placeholder="请输入url" ref={ref} defaultValue={url} />
      <br /> <br />
      <Button
        onClick={() => {
          const params = getUrlParameter(null, ref.current.state.value);
          alert(JSON.stringify(params));
        }}
      >
        获取全部
      </Button>
    </>
  );
}
```

## API

function(name, url)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|name|需要获取的参数名，当name不存在时，获取全部参数|String|-|
|url|指定的 url 地址，默认为当前页面地址|String|window.location.href|
