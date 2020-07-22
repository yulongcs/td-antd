---
title: TdUpload
---

## TdUpload

基于 Upload 的二次封装

```jsx
import React from 'react';
import { Row, Col } from 'antd';
import TdUpload from './index';

export default () => {
  return (
    <Row>
      <Col span={12}>
        <TdUpload
          size={5}
          multiple
          // disabled
          btnText="上传"
          tip="仅支持 pdf 文件。"
          // listType="picture-card"
          callback={(t) => {
            if (t === 'remove') {
              return Promise.resolve();
            }
          }}
        />
      </Col>
      <Col span={12}>
        <TdUpload
          size={5}
          multiple
          btnText="上传"
          isSize={[938]}
          accept="image/*"
          tip="仅支持图片格式。"
          listType="picture-card"
          callback={(t, file, files) => {
            if (t === 'before') {
              console.log('开始 before 回调');
            }
            if (t === 'after') {
              console.log(files);
            }
          }}
        />
      </Col>
    </Row>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|接口地址|String|-|
|initialFiles|初始化数据，需要 onInitialFiles 重组|Array|-|
|wrapClassName|最外层样式类|String|-|
|isPreview|是否可预览|Boolean|true|
|params|文件上传的入参|Object|-|
|maxFiles|上传文件数的最大值|Number|10|
|disabled|是否禁用|Boolean|false|
|btnText|按钮文案|String|'upload'|
|btnProps|Button 的 api|Object|{}|
|size|单个文件大小，默认单位 MB|Number|20|
|nameSize|文件名长度，包含后缀|Number|200|
|hideRemoveBtn|是否隐藏删除按钮|Boolean|false|
|showUploadList|是否展示文件列表|Boolean|true|
|filterOptions|同 onInitialFiles 的 filterOptions 函数，在上传后会执行过滤操作|Function|-|
|callback|回调函数|Function|-|
|name|发到后台的文件参数名|String|'files'|
|tip|提示文案|String|-|
|isSize|图片宽高校验，如：[350, 750]，表示宽限制为350，高限制为750。也可只限制宽或高，宽度：[350]；高度：[null, 750]|Array|-|

### callback

```
callback = (state, file, files) => {
  if (state === 'before') {
    // 只会触发一次
  }
  if (state === 'validate') {
    // 额外的校验，每个文件都会执行一次，返回值为真时，则停止上传
  }
  if (state === 'after') {
    // 只会触发一次
  }
  if (state === 'remove') {
    // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
  }
}
```

### Ref

```
// 重置列表
ref.current.reset();

// 主动的文件上传
ref.current.onUpload((files, dataObject) => {}, (res) => {});
```

### onInitialFiles(files, filterOptions)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|files|原数据|Array|[]|
|filterOptions|自定义数据过滤，需要返回过滤后的数据对象。返回的对象中必须包含 `uid、name、url`；如果需要图片展示，则数据中需要包含 `type: 'image/*'`|Function(item, index)|-|

> 注意：需要 localConfig.config 设置 proxy 后才能正常使用

## TdUpload.Preview

> 渲染文件列表的组件，可预览

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|fileList|渲染的文件列表原数据，需要使用 onInitialFiles 进行过滤；或者数据对象中必须包含 `uid、name、url`|Array|-|
|isHandle|是否在 hover 后展示操作区|Boolean|false|
|onRemove|点击删除的回调函数|Function|-|
