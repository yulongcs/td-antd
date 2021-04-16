---
title: momentToString
---

## momentToString

moment 和 string 之间的转换，默认格式为 YYYY-MM-DD。如果 value 对象是 moment，则会转为 format 的格式日期，反之亦然

## 代码演示

```jsx
/**
 * title: 基础用法
 */
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { tools } from 'td-antd';

const { momentToString } = tools;

export default () => {
  const [time, setTime] = useState('');
  const onChange = (date, dateString) => {
    setTime(momentToString(date));
  };

  return (
    <>
      <DatePicker
        onChange={onChange}
        defaultValue={momentToString('2020-11-11')}
      />
      <div style={{ paddingTop: 12 }}>{time}</div>
    </>
  );
}
```

```jsx
/**
 * title: 进阶用法
 * desc: 与 Form.Item 的 normalize 进行搭配使用，减少手动转化过程
 */
import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Button } from 'antd';
import { tools } from 'td-antd';
import moment from 'moment';

const { momentToString } = tools;

// 重写受控组件
const DatePickerInitEasily = ({ value, ...rest }) => {
  const momentedValue = value
    ? moment.isMoment(value)
      ? value
      : moment(value)
    : undefined;

  return (
    <DatePicker
      value={momentedValue}
      {...rest}
    />
  );
}

export default () => {
  const [form] = Form.useForm();
  const [json, setJson] = useState('');

  const onFinish = values => {
    setJson(JSON.stringify(values));
  };
  
  // 异步写入数据
  useEffect(() => {
    setTimeout(() => {
      form.setFieldsValue({
        date: '2021-04-20'
      });
    }, 3000)
  }, []);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          date: '2021-04-16'
        }}
      >
        <Form.Item
          label="日期"
          name="date"
          normalize={date => momentToString(date)}
        >
          <DatePickerInitEasily />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ color: 'red' }}>{json}</div>
    </>
  );
}
```

## API

function(param1, param2)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|param1|需要转化的数据，moment/format|Object/String|-|
|param2|format的格式|String|YYYY-MM-DD|
