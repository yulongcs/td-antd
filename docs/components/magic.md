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
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }, [loading])
  
  useEffect(() => {
    if (itemLoading) {
      setTimeout(() => {
        setItemLoading(false);
      }, 2000)
    }
  }, [itemLoading])

  return (
    <Magic
      loading={loading}
      left={260}
      footerStyle={{ justifyContent: 'flex-end' }}
      footer={(
        <>
          <Button>保存草稿</Button>
          <Button type="primary">提交</Button>
        </>
      )}
    >
      <Magic.Item
        // title="项目A"
        titleExtra="自定义title"
        extra={<Button type="primary">新增</Button>}
        footer={<Button type="primary" onClick={() => { setLoading(true) }}>全局loading</Button>}
      >
        这里是内容
      </Magic.Item>
      <Magic.Item
        isCollapsed
        title="项目B"
        loading={itemLoading}
        extra={<Button type="primary">新增</Button>}
        footer={<Button type="primary" onClick={() => { setItemLoading(true) }}>卡片loading</Button>}
      >
        这里是内容
      </Magic.Item>
    </Magic>
  );
}
```

```jsx
/**
 * title: 无 header 用法
 * desc: 当没有 title、extra、isCollapsed 时，不会展示头部
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectMap } from 'td-antd';

export default () => {
  return (
    <Magic>
      <Magic.Item>
        <SearchForm
          span={8}
          columns={[
            {
              title: '手机',
              dataIndex: 'phone',
              inputProps: { placeholder: '请输入手机号' },
            }, {
              title: '地址',
              dataIndex: 'address',
            }, {
              title: '年龄',
              dataIndex: 'age',
            }, {
              title: '状态',
              dataIndex: 'status',
              component: <SelectMap data={['很长的一个枚举值哟呵', '已完成']} />
            }, {
              title: '时间',
              dataIndex: 'date',
              component: <DatePicker style={{ width: '100%' }} />
            },
          ]}
        />
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
|footerStyle|固定页脚的样式|Object|-|

### Magic.Item

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|title|标题|ReactNode|-|
|titleExtra|额外的标题内容|ReactNode|-|
|footer|页脚内容|ReactNode|-|
|footerVisible|页脚内容是否展示|Boolean|true|
|loading|加载效果|Boolean|false|
|isCollapsed|是否有折叠按钮|Boolean|false|
|extra|卡片右上角的操作区域|ReactNode|-|
|boxShadow|是否展示阴影|Boolean|true|
