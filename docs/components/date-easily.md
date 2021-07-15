---
title: DateEasily
---

## DateEasily

基于 DatePicker 的二次封装，与 Form.Item 的 normalize 进行搭配使用，减少预处理操作。

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { DateEasily, tools } from 'td-antd';

const { momentToString } = tools;

const format = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  week: 'YYYY-wo', // moment@2.29.1 未修复该 bug，请不要使用
  time: 'HH:mm:ss',
};

export default () => {
  const [form] = Form.useForm();
  const [json, setJson] = useState('');

  const onFinish = values => {
    console.log(values);
    setJson(JSON.stringify(values));
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="时间"
          name="time"
          normalize={date => date && momentToString(date, format.time)}
        >
          <DateEasily type="123" picker="time" format={format.time} />
        </Form.Item>
        <Form.Item
          label="日期"
          name="date"
          normalize={date => date && momentToString(date, format.date)}
          rules={[{ required: true, message: '必填' }]}
        >
          <DateEasily />
        </Form.Item>
        <Form.Item
          label="周"
          name="week"
          normalize={date => date && momentToString(date, format.week)}
        >
          <DateEasily picker="week" format={format.week} />
        </Form.Item>
        <Form.Item
          label="月份"
          name="month"
          normalize={date => date && momentToString(date, format.month)}
        >
          <DateEasily picker="month" format={format.month} />
        </Form.Item>
        <Form.Item
          label="日期区间"
          name="dateRange"
          normalize={date => date && [momentToString(date[0], format.date), momentToString(date[1], format.date)]}
        >
          <DateEasily type="RangePicker" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ color: 'red' }}>form data：{json}</div>
    </>
  );
}
```

```jsx
/**
 * title: 在 SearchForm 上的表现
 * desc: 搭配 formItemProps 属性，轻松实现数据转化，减少预处理
 */
import React, { useState } from 'react';
import { DateEasily, tools, SearchForm } from 'td-antd';

const { momentToString } = tools;

export default () => {
  return (
    <SearchForm
      columns={[
        {
          title: '开始时间',
          dataIndex: 'startTime',
          component: <DateEasily />,
          formItemProps: { normalize: date => date && momentToString(date)},
        }, {
          title: '结束时间',
          dataIndex: 'endTime',
          component: <DateEasily />,
          formItemProps: { normalize: date => date && momentToString(date)},
        },
      ]}
      callback={(type, values) => {
        console.log(values);
      }}
    />
  );
}
```

## API

支持原 [DatePicker](https://ant.design/components/date-picker-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|type|需要使用 DatePicker 的子组件时，填写子组件名称，如：RangePicker|string|-|
|format|需要转化的时间格式，可以参考 [moment.js](http://momentjs.cn/docs/)|String|`YYYY-MM-DD`|

## PS

由于 moment@2.29.1 未修复 'YYYY-wo' 格式的问题，我们的组件中请不要使用类型为 'week' 的时间组件。
