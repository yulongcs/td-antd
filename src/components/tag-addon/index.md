---
title: TagAddon
---

## TagAddon

基于 Tag 的二次封装，可在标签的前面和后面添加自定义元素。

```jsx
import React from 'react';
import TagAddon from './index';

export default () => {
  return (
    <>
      <TagAddon
        tagProps={{ color: 'blue' }}
        addonBefore="前面"
        addonAfter="后面"
      >
        有背景色
      </TagAddon>
      <br />
      <TagAddon
        tagProps={{ color: 'red' }}
        addonBefore="前面"
        addonAfter="后面"
        isBackground={false}
      >
        无背景色
      </TagAddon>
    </>
  );
}
```

## API

支持原 [Tag](https://ant-design.gitee.io/components/tag-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|addonBefore|标签的前置内容|String/ReactNode|-|
|addonAfter|标签的后置内容|String/ReactNode|-|
|isBackground|是否展示背景色；在使用十六进制颜色时可能产生超乎预期的表现，请谨慎使用|Boolean|true|-|
|tagProps|原 [Tag](https://3x.ant.design/components/tag-cn/) 组件的属性集|Object|{}|
