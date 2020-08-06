---
title: downloadBlob
---

## downloadBlob

文件流下载

## API

function(object)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|请求地址|String|-|
|filename|下载后的文件名|String|默认使用后端在 Content-Disposition 中包装好的名称|
|body|使用该参数会将请求变为 POST，且为 入参|Object|-|
