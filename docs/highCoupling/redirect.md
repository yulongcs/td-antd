---
title: redirect
---

## redirect

dva.routerRedux.push 的简单封装，实现路由切换。必须配置了 `localConfig` 后才能正常使用。

```
// 路由切换，如切换至：localhost:8080/demo
redirect(path, dispatch, blank);

// 第一个参数：需要跳转的路由
// 第二个参数：如果不传，将会从全局配置(localConfig)中获取
// 第三个参数：如果等于 "_blank"，则会新开页面
```

## 代码演示

```jsx
import React from 'react';
import { Button } from 'antd';
import { redirect } from 'td-antd';

export default () => {
  return (
    <Button
      onClick={() => {
        redirect('/components/date-easily', null, '_blank');
      }}
    >
      新开页面跳转至 DateEasily
    </Button>
  );
}
```
