---
title: Magic
---

## Magic

魔法卡片

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Magic } from 'td-antd';

export default () => {
  return (
    <Magic>
      <Magic.Item
        isCollapsed
        title="项目需求"
        extra={<Button type="primary">新增</Button>}
        footer={<Button type="primary">提交</Button>}
      >
        这里是内容
      </Magic.Item>
      <Magic.Item
        isCollapsed
        title="项目需求"
        extra={<Button type="primary">新增</Button>}
        footer={<Button type="primary">提交</Button>}
      >
        这里是内容
      </Magic.Item>
    </Magic>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|footer|页脚内容，会固定在底部|ReactNode|-|
|footerVisible|页脚内容是否展示|Boolean|true|
|loading|加载效果|Boolean|false|
|left|定位时距离左侧的值|Number|200|

### Magic.Item

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|标题|ReactNode|-|
|footer|页脚内容|ReactNode|-|
|footerVisible|页脚内容是否展示|Boolean|true|
|loading|加载效果|Boolean|false|
|isCollapsed|是否有折叠按钮|Boolean|false|
|extra|卡片右上角的操作区域|ReactNode|-|
