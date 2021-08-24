---
title: Ellipsis
---

## Ellipsis

很简单的一个文本省略组件，你甚至可以用 css 来代替🐶

## 代码演示

```jsx
/**
 * title: 单行省略
 * desc: 双击改变省略状态
 */
import React from 'react';
import { Ellipsis } from 'td-antd';

export default () => {
  return (
    <Ellipsis width={240}>以前我每天都会买彩票，终于有一天，我连彩票都买不起了。</Ellipsis>
  );
}
```

```jsx
/**
 * title: 不要默认的双击事件
 * desc: 可以重写 onDoubleClick 来覆盖原有的默认事件
 */
import React from 'react';
import { Ellipsis } from 'td-antd';

export default () => {
  return (
    <Ellipsis
      width={240}
      onDoubleClick={() => {}}
    >
      以前我每天都会买彩票，终于有一天，我连彩票都买不起了。
    </Ellipsis>
  );
}
```

```jsx
/**
 * title: 多行省略
 * desc: 提供基于 -webkit-line-clamp 的多行省略。兼容性参见 [caniuse](https://caniuse.com/?search=line-clamp)。
 */
import React from 'react';
import Ellipsis from 'td-antd/ellipsis';

export default () => {
  return (
    <Ellipsis lineClamp={2}>
      去年今日此门中，<br />人面桃花相映红。<br />人面不知何处去，<br />桃花依旧笑春风。
    </Ellipsis>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|width|组件展示的最大宽度|String/Number|100%|
|lineClamp|多行省略，使用 -webkit-line-clamp，请注意兼容性|Number|-|
|defaultEllipsis|默认是否进行省略展示|Boolean|true|

## PS

双击后可进行省略或全文展示
