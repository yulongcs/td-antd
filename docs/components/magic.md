---
title: Magic
---

## Magic

魔法卡片，用到你不想用的那种。。。

## 代码演示

```jsx
/**
 * title: Magic 基础用法
 */
import React from 'react';
import Demo from '../tests/magic/demo1';

export default () => <Demo />;
```

```jsx
/**
 * title: Magic.Item 基础用法
 * desc: 
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectList } from 'td-antd';
import { _setTimeout } from '_utils';

export default () => {
  const [loading, setLoading] = useState(false);
  const [shadow, setShadow] = useState(true);
  
  const onClick = () => {
    setLoading(true);
    
    _setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Magic.Item
      isCollapsed
      loading={loading}
      boxShadow={shadow}
      title={
        <>
          这是一个魔法盒子
          <Button>按钮</Button>
        </>
      }
      extra={<Button type="primary" onClick={onClick}>Loading</Button>}
      footer={<Button onClick={() => { setShadow(!shadow) }}>{shadow ? '关闭' : '开启'}阴影效果</Button>}
    >
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
            component: <SelectList localData={['很长的一个枚举值哟呵', '已完成']} />
          }, {
            title: '时间',
            dataIndex: 'date',
            component: <DatePicker style={{ width: '100%' }} />
          },
        ]}
      />
    </Magic.Item>
  );
}
```

```jsx
/**
 * title: 无阴影
 * desc: 在 Magic 中使用的 boxShadow 会传递给子组件。权重：子组件的优先级大于父组件
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectList } from 'td-antd';

export default () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 24 }}>
      <Magic boxShadow={false}>
        <Magic.Item>
          <SearchForm
            span={8}
            callback={(type, values) => {
              console.log('type: ', type);
              console.log('values: ', values);
            }}
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
                component: <SelectList localData={['很长的一个枚举值哟呵', '已完成']} />
              }, {
                title: '时间',
                dataIndex: 'date',
                component: <DatePicker style={{ width: '100%' }} />
              },
            ]}
          />
        </Magic.Item>
        <Magic.Item
          boxShadow
          isCollapsed
          title="项目B"
          extra={<Button type="primary">新增</Button>}
          footer={<Button type="primary">卡片loading</Button>}
        >
          这里是内容
        </Magic.Item>
      </Magic>
    </div>
  );
}
```

```jsx
/**
 * title: 无页脚的 Magic.Item
 * desc: 将 footer 设置为 false 后，不展示页脚
 */
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Magic, SearchForm, SelectList } from 'td-antd';

export default () => {
  return (
    <Magic.Item
      isCollapsed
      title="This is Magic.Item title"
    >
      <SearchForm
        span={8}
        callback={(type, values) => {
          console.log('type: ', type);
          console.log('values: ', values);
        }}
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
            component: <SelectList localData={['很长的一个枚举值哟呵', '已完成']} />
          }, {
            title: '时间',
            dataIndex: 'date',
            component: <DatePicker style={{ width: '100%' }} />
          },
        ]}
      />
    </Magic.Item>
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|wrapperClassName|Spin容器类名称|String|-|
|footerClassName|页脚的样式类|ClassName|-|
|footer|页脚内容，会固定在底部。等于 false 时，不显示|ReactNode|false|
|loading|加载效果|Boolean|false|
|boxShadow|控制子组件是否有阴影效果|Boolean|true|
|onCollapsed|子组件 展开/收起 时的回调函数|Function(isCollapsed, itemKey)|-|

> 建议单个页面只使用一个 Magic 组件进行包裹，否则可能出现预期外的情况。

### Magic.Item

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|wrapperClassName|Spin容器类名称|String|-|
|footerClassName|页脚的样式类|ClassName|-|
|title|标题|ReactNode|-|
|footer|页脚内容|ReactNode|-|
|loading|加载效果|Boolean|false|
|isCollapsed|是否有折叠按钮|Boolean|false|
|extra|卡片右上角的操作区域|ReactNode|-|
|boxShadow|该权限大于父组件属性|Boolean|true|
|itemKey|组件的唯一标示|String/Number|-|
|onCollapsed|面板 展开/收起 的回调函数，权重大于父组件|Function(isCollapsed, itemKey)|-|
|defaultCollapsed|默认状态下面板的展开和收起|Boolean|true|
