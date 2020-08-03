---
title: autoTrack
---

## autoTrack

轻量级埋点组件

```jsx
import React from 'react';
import { Button } from 'antd';
import { autoTrack } from 'td-antd';

autoTrack({
  pageCallback: (log) => {
    alert(log);
  },
  eventCallback: (log) => {
    alert(log);
  },
});

export default () => {
  return (
    <div logpage="页面级">
      <Button logevent={{ type: 'click: Button' }}>按钮</Button>
      <br />
      <span logevent={{ type: 'click: span' }}>click</span>
    </div>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|logpage|页面级埋点标示，作用于节点的属性|Object/String||
|logevent|click事件埋点，作用于节点的属性|Object/String||
|pageCallback|页面埋点的回调函数，只会触发一次|Function(log)||
|eventCallback|点击事件埋点的回调函数|Function(log)||
