---
title: validateFields
---

## validateFields

[form.validateFields](https://ant-design.gitee.io/components/form-cn/#validateFields-%E8%BF%94%E5%9B%9E%E7%A4%BA%E4%BE%8B) 的简化使用，在 catch 中内置处理了 scrollToField 的错误滚动

## 代码演示

```jsx
/**
 * title: 基本使用
 */
import React from 'react';
import { Form, Button, Switch } from 'antd';
import { FormItem, SelectMap, tools } from 'td-antd';

const { validateFields } = tools;
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 7,
    },
  },
};

export default () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    validateFields({ form }, values => {
      console.log(values);
    })
  };
  
  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
    >
      <FormItem
        label="姓名"
        name="name"
        validateFirst
        required={false}
      />
      <FormItem
        label="年龄"
        name="age"
        unit="岁"
        itemType="number"
        inputProps={{ placeholder: '失去焦点后校验' }}
        validateTrigger="onBlur"
      />
      <FormItem
        label="性别"
        name="sex"
      >
        <SelectMap data={['男', '女']} />
      </FormItem>
      <FormItem
        label="开关"
        name="switch"
        required={false}
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button onClick={onFinish}>提交</Button>
      </FormItem>
    </Form>
  );
}
```

## API

function(params, callback)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|params|入参对象，必须有 form 对象|Object|-|
|callback|验证通过后的回调函数|function(values)|-|

### params

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|form|表单的form对象|form|-|
|fields|需要校验的字段，默认全部|Array[String]|null|
|setLoading|hooks中设置loading的函数|function|-|



