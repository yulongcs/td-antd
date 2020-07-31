---
title: storageWorker
---

## storageWorker

针对 localStorage 的缓存操作

```jsx
import React, { useEffect } from 'react';
import HandleBox from '../components/handle-box';
import LinkBtn from '../components/link-btn';
import storageWorker from './storageWorker.js';

export default () => {
  const setDemo = () => {
    storageWorker({
      type: 'set',
      fields: {
        demo: { a: 1, b: 2, c: 3 },
      },
      callback(res) {
        console.dir(res)
      },
    })
  };
  
  const getDemo = () => {
    storageWorker({
      callback(res) {
        console.dir(res)
      },
    })
  };
  
  const deleteDemo = () => {
    storageWorker({
      type: 'delete',
      fields: ['demo'],
      callback(res) {
        console.log(res)
      },
    })
  };

  return (
    <HandleBox>
      <LinkBtn onClick={setDemo}>写入</LinkBtn>
      <LinkBtn onClick={getDemo}>获取</LinkBtn>
      <LinkBtn onClick={deleteDemo}>删除</LinkBtn>
    </HandleBox>
  );
}
```

## API

function(object)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|version|写入缓存的 key 值|String|'v1'|
|type|get = 获取，set = 写入，delete = 删除|String|'get'|
|fields|字段集，当 type = set 时，该字段为对象，如 { key: value }；当 type = delete 时，该对象为数组字符串，如 ['key1', 'key2']|Object|{}|
|callback|回调函数，返回处理后的数据|Function(res)|-|
