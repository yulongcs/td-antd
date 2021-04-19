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
import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Button } from 'antd';
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
          normalize={date => momentToString(date, format.time)}
        >
          <DateEasily picker="time" format={format.time} />
        </Form.Item>
        <Form.Item
          label="日期"
          name="date"
          normalize={date => momentToString(date, format.date)}
        >
          <DateEasily />
        </Form.Item>
        <Form.Item
          label="周"
          name="week"
          normalize={date => momentToString(date, format.week)}
        >
          <DateEasily picker="week" format={format.week} />
        </Form.Item>
        <Form.Item
          label="月份"
          name="month"
          normalize={date => momentToString(date, format.month)}
        >
          <DateEasily picker="month" format={format.month} />
        </Form.Item>
        <Form.Item
          label="日期区间"
          name="dateRange"
          normalize={date => [momentToString(date[0], format.date), momentToString(date[1], format.date)]}
        >
          <DateEasily Component={DatePicker.RangePicker} />
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

## API

支持原 [DatePicker](https://ant.design/components/date-picker-cn/) API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|Component|当前使用的组件|antdComponent|DatePicker|
|format|需要转化的时间格式，可以参考 [moment.js](http://momentjs.cn/docs/)|String|`YYYY-MM-DD`|

## PS

由于 moment@2.29.1 未修复 'YYYY-wo' 格式的问题，我们的组件中请不要使用类型为 'week' 的时间组件。
