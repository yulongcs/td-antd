---
title: TablePage
---

## TablePage

基于 Table 封装的简易列表页，包含搜索栏和 table

## 代码演示

```jsx
/**
 * title: 基础用法
 */
 
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { TablePage, SelectMap } from 'td-antd';

export default () => {
  return (
    <TablePage
      url="/aaa.json"
      searchReturn={(values) => {
        console.log(values);
        
        return values;
      }}
      columns={[
        {
          title: '手机',
          dataIndex: 'phone',
        }, {
          title: '地址',
          dataIndex: 'address',
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '性别',
          dataIndex: 'sex',
        }, {
          title: '时间',
          dataIndex: 'time',
        },
      ]}
      searchFormProps={{
        columns: [
          {
            dataIndex: 'phone',
            inputProps: { placeholder: '手机' }
          }, {
            dataIndex: 'address',
            inputProps: { placeholder: '地址' }
          }, {
            dataIndex: 'age',
            inputProps: { placeholder: '年龄' }
          }, {
            dataIndex: 'sex',
            component: <SelectMap placeholder="性别" data={['男', '女']} />
          }, {
            dataIndex: 'time',
            component: <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
          },
        ],
      }}
    />
  );
}
```

```jsx
/**
 * title: 多 tab 栏用法
 * desc: 当切换 tab 栏时，根据指定参数请求列表数据，并重新渲染搜索栏
 */
 
import React, { useState, useRef } from 'react';
import { Button, Tabs } from 'antd';
import { TablePage, SelectMap } from 'td-antd';

export default () => {
  const tablePageRef = useRef();

  return (
    <>
      <Tabs
        onChange={(key) => {
          tablePageRef.current.query({
            status: key,
          }, true)
          // console.log(tablePageRef.current);
          tablePageRef.current.searchFormRef.resetFields(); // 重置搜索栏
          tablePageRef.current.searchFormRef.setFieldsValue({ status: key }); // 设置搜索栏
        }}
      >
        <Tabs.TabPane tab="全部" key="全部" />
        <Tabs.TabPane tab="已删除" key="已删除" />
        <Tabs.TabPane tab="仓库中" key="仓库中" />
      </Tabs>
      <TablePage
        url="/aaa.json"
        ref={tablePageRef}
        defaultParams={{ extra: '额外的参数' }}
        extra={
          <>
            <Button>删除</Button>
            <Button type="primary">新增</Button>
          </>
        }
        searchReturn={(values) => {
          console.log(values);
          return values;
        }}
        searchFormProps={{
          columns: [
            {
              dataIndex: 'productName',
              inputProps: { placeholder: '产品名称' }
            }, {
              dataIndex: 'status',
              component: <SelectMap placeholder="状态" data={['全部', '已删除', '仓库中']} />
            },
          ],
        }}
      />
    </>
  );
}
```

```jsx
/**
 * title: 公共 columns 用法
 * desc: 搜索栏的字段将会从 columns 中进行筛选，并可以使用 order 来排序
 */
 
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { TablePage, SelectMap } from 'td-antd';

export default () => {
  return (
    <TablePage
      line={false}
      url="/aaa.json"
      searchReturn={(values) => {
        console.log(values);
        
        return values;
      }}
      columns={[
        {
          title: '手机',
          title2: '手机号码',
          dataIndex: 'phone',
          enableSearch: true,
          inputProps: { placeholder: '手机' },
          order: 1
        }, {
          title: '地址',
          dataIndex: 'address',
          enableSearch: true,
          inputProps: { placeholder: '地址' },
          order: 0
        }, {
          title: '年龄',
          dataIndex: 'age',
          enableSearch: true,
          inputProps: { placeholder: '年龄' },
        }, {
          title: '性别',
          dataIndex: 'sex',
          enableSearch: true,
          component: <SelectMap placeholder="性别" data={['男', '女']} />,
        }, {
          title: '时间',
          dataIndex: 'time',
          enableSearch: true,
          component: <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />,
        },
      ]}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|列表请求地址。由于内置使用 request 是从 localConfig 中获取的，不必再使用 proxy |String|-|
|tableProps|支持原 [Table](https://3x.ant.design/components/table-cn/) 的 API|Object|{}|
|columns|表格列的配置描述，同原 Table 组件|ColumnProps[]|[]|
|searchFormProps|SearchForm 组件的属性|Object|{}|
|searchReturn|自定义搜索栏的回调函数，必须返回结果对象给组件以供搜索使用|Function(values)|-|
|defaultParams|默认参数，一般是不变的|Object|{}|
|success|请求成功后的回调函数，必须返回用于列表渲染的数据，包含 { values, pageNum, pageSize, totalCnt }|Function(res)|-|
|extra|在搜索栏和列表中间的额外节点项|ReactNode/String|-|
|paginationProps|Pagination组件的 API|[paginationProps](https://ant.design/components/pagination-cn/#API)|{}|
|line|搜索栏和表格栏之间的基线|Boolean|true|

### columns

支持原 Table 组件的属性，以下是针对 "搜索项" 的属性

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|enableSearch|是否将其转为搜索项|Boolean|false|
|component|用于搜索项展示的字段|ReactNode|Input|
|formItemProps|表单项的属性|Object|-|
|inputProps|当 component 不存在时，可以对 Input 进行描述|Object|-|
|title2|用于搜索项的 label，优先级大于 title|String/ReactNode|-|
|dataIndex2|用于搜索项的 name，优先级大于 dataIndex|String|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|searchFormRef|searchForm 的 form 对象|Object|-|
|query|重新获取列表数据|Function(params, reset)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用
