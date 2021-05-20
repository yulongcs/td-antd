---
title: Demo
order: 2
---

## 开始-结束时间校验

使用 dependencies 控制时间组件的关联校验

```jsx
import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, Form, Button } from 'antd';
import { DateEasily, tools } from 'td-antd';

const { momentToString } = tools;

export default () => {
  const [form] = Form.useForm();
  const [json, setJson] = useState('');

  const onFinish = values => {
    console.log(values);
    setJson(JSON.stringify(values));
  };

  return (
    <Form form={form}>
      <Form.Item
        label="开始时间"
        name="startTime"
        dependencies={['endTime']}
        rules={[
          { required: true, message: '请选择开始时间' },
          {
            validator: (rule, value, callback) => {
              const end = form.getFieldValue('endTime');
              
              if (value && end && moment(value).valueOf() > moment(end).valueOf()) {
                callback('开始时间不能大于结束时间');
                return;
              }
              
              callback();
            },
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="endTime"
        dependencies={['startTime']}
        rules={[
          { required: true, message: '请选择结束时间' },
          {
            validator: (rule, value, callback) => {
              const start = form.getFieldValue('startTime');
              
              if (value && start && moment(value).valueOf() < moment(start).valueOf()) {
                callback('结束时间不能小于开始时间');
                return;
              }
              
              callback();
            },
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```
