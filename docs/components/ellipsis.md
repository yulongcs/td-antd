---
title: Ellipsis
---

## Ellipsis

文本省略

## 代码演示

```jsx
/**
 * title: 单行省略
 */
import React from 'react';
import Ellipsis from 'td-antd/ellipsis';

export default () => {
  return (
    <Ellipsis width={240}>以前我每天都会买彩票，终于有一天，我连彩票都买不起了。</Ellipsis>
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
