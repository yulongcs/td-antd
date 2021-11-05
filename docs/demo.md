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

  const onFinish = values => {
    console.log(values);
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

## 表单联动

使用 shouldUpdate 控制表单之间的联动

```jsx
import React, { useState } from 'react';
import { DatePicker, Form, Button, Switch } from 'antd';
import { FormItem } from 'td-antd';

export default () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <FormItem
        label="开关"
        name="switch"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </FormItem>
      <FormItem
        noStyle
        shouldUpdate
      >
        {({ getFieldValue }) => {
          if (getFieldValue('switch')) {
            return (
              <FormItem
                label="备注"
                name="remark"
              />
            );
          }
        }}
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```

## 表单错误滚动

当 scrollToFirstError 设置不起效时，可使用以下方式解决

```jsx
import React, { useState } from 'react';
import { DatePicker, Form, Button, Switch } from 'antd';
import { FormItem } from 'td-antd';

export default () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then(values => {
      console.log(values)
    }).catch(error => {
      // 当表单错误函数存在时，页面拉到对应错误位置
      if (error.errorFields) {
        form.scrollToField((error.errorFields[0].name)[0]);
      }
    })
  };

  return (
    <Form form={form}>
      {(new Array(20).fill(0)).map((i, index) => (
        <FormItem
          label={`名称${index}`}
          name={`name${index}`}
        />
      ))}
      <Form.Item>
        <Button type="primary" onClick={onFinish}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```
