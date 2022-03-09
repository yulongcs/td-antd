---
title: FormItem
---

## FormItem

基于 Form.Item 的二次封装，可灵活的搭建表单内容。

## 代码演示

```jsx
/**
 * title: 基本使用
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Switch } from 'antd';
import { FormItem, SelectList, SelectSearch, TdUpload } from 'td-antd';

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

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: '丁老板',
        switch: false,
        age: 18,
        sex: 'man'
      }}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
    >
      <FormItem
        label="手机号"
      >
        13800000000
      </FormItem>
      <FormItem
        label="开关"
        name="switch"
        required={false}
        valuePropName="checked"
      >
        <Switch />
      </FormItem>
      <FormItem noStyle shouldUpdate>
        {({ getFieldValue }) => {
          if (getFieldValue('switch')) {
            return (
              <FormItem
                label="姓名"
                name="name"
                validateFirst
                required={false}
              />
            );
          }
        }}
      </FormItem>
      <FormItem
        label="年龄"
        name="age"
        unit="岁"
        nonZero
        isInteger
        itemType="number"
        inputProps={{ placeholder: '失去焦点后校验' }}
        validateTrigger="onBlur"
      />
      <FormItem
        label="性别"
        name="sex"
      >
        <SelectList
          localData={[
            {
              key: 'woman',
              value: '女',
            }, {
              key: 'man',
              value: '男',
            },
          ]}
        />
      </FormItem>
      <FormItem
        label="电话"
        name="phone"
      >
        <SelectSearch
          allowClear
          mode="multiple"
          placeholder="搜索电话号码"
          fields={['cell', 'phone']}
          // 使用公共接口进行测试
          url="https://randomuser.me/api/?results="
          afterFetch={res => res.results}
        />
      </FormItem>
      <FormItem
        name="bankNo"
        label="银行卡号"
        hasFeedback
        validateFirst
        normalize={(v) => v.replaceAll(' ', '')}
        extra="使用 validatorCallback 进行额外的校验，并使用 Promise 返回错误信息"
        extraRules={{
          pattern: /^\d{16,19}$/,
          message: '卡号格式不正确',
        }}
        validatorCallback={(value) => {
          return new Promise((resolve, reject) => {
            fetch(`https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${value}&cardBinCheck=true`)
              .then(res => res.json())
              .then(({ cardType }) => {
                if (!cardType) {
                  return reject(new Error('无效银行卡'))
                }
    
                if (cardType === 'CC') {
                  return reject(new Error('不能是信用卡，请更换为储蓄卡'))
                }
    
                resolve();
              });
          })
        }}
      />
      <FormItem
        name="bankNo2"
        label="银行卡号2"
        hasFeedback
        validateFirst
        normalize={(v) => v.replaceAll(' ', '')}
        extra="使用 validatorCallback 进行额外的校验，并使用 callback 返回错误信息"
        extraRules={{
          pattern: /^\d{16,19}$/,
          message: '卡号格式不正确',
        }}
        validatorCallback={(value, callback) => {
          fetch(`https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${value}&cardBinCheck=true`)
            .then(res => res.json())
            .then(({ cardType }) => {
              if (!cardType) {
                return callback('无效银行卡');
              }

              if (cardType === 'CC') {
                return callback('不能是信用卡，请更换为储蓄卡');
              }
  
              callback();
            });
        }}
      />
      <FormItem
        label="文件"
        name="files"
        valuePropName="fileList"
        getValueFromEvent={e => (!e || !e.fileList) ? e : e.fileList}
      >
        <TdUpload maxFiles={1} />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button htmlType="submit">提交</Button>
      </FormItem>
    </Form>
  );
}
```

```jsx
/**
 * title: 校验顺序
 * desc: 先校验 extraRules，再校验 validatorCallback
 */
import React from 'react';
import { Form, Button } from 'antd';
import { FormItem } from 'td-antd';

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
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
    >
      <FormItem
        label="手机号"
        name="phone"
        validateFirst
        inputProps={{ placeholder: '请输入手机号' }}
        extraRules={{
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不正确',
        }}
        validatorCallback={(value, callback) => {
          if (value !== '13666666666') {
            callback('手机号码应该为 13666666666');
          }
        }}
      />
      <FormItem {...tailLayout}>
        <Button htmlType="submit">提交</Button>
      </FormItem>
    </Form>
  );
}
```

```jsx
/**
 * title: 自定义异步校验
 * desc: 使用 validatorCallback 进行异步校验。
 */
import React from 'react';
import { Form, Button } from 'antd';
import { FormItem } from 'td-antd';

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
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 10 }}
    >
      <FormItem
        hasFeedback
        label="手机号"
        name="phone"
        validateFirst
        inputProps={{ placeholder: '请输入手机号' }}
        extraRules={{
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不正确',
        }}
        validatorCallback={(value, callback) => {
          if (value) {
            setTimeout(() => {
              if (value !== '13666666666') {
                callback('手机号码应该为 13666666666');
              } else {
                callback();
              }
            }, 2000);
          }
        }}
      />
      <FormItem {...tailLayout}>
        <Button htmlType="submit">提交</Button>
      </FormItem>
    </Form>
  );
}
```

## API

支持原 [Form.Item](https://ant-design.gitee.io/components/form-cn/#Form.Item) API

|参数|说明|类型|默认值|版本|
|:--|:--|:--|:--|:--|
|required|表单项是否为必填|Boolean|true|
|message|非空校验错误文案|String|'必填项'|
|validatorCallback|自定义校验，同时支持 callback 和 Promise 返回值。[示例](#form-item-demo)参考|Function(value, callback)|-|
|children|子节点| ReactNode |[Input](https://ant-design.gitee.io/components/input-cn/)|
|extraRules|额外的规则，用法同 rules|Array / Object|-|
|inputProps|Input 组件的属性 API|Object|{ }|
|itemType|申明组件类型，普通组件(default) / Number组件(number)|String|default|
|show|是否显示。当不显示时，不进行字段记录和校验，区别于[hidden](https://ant-design.gitee.io/components/form-cn/#Form.Item)|Boolean|true|2.2.0|

> 当 itemType="number" 时，只能输入数字，并可以使用以下属性<br />
> 遵循 input 的 type="number" 的 w3c 规则

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|unit|显示单位|String|-|
|isNegative|是否为负数，默认不可以| Boolean |false|
|isInteger|是否为整数，默认不是|Boolean |false|
|nonZero|是否非零|Boolean |false|

## FAQ

### FormItem 包裹 Upload 时，非空不校验

```
valuePropName="fileList"
getValueFromEvent={e => (!e || !e.fileList) ? e : e.fileList}
```

### 当设置 nonZero 后，空值时会报2个错误

```
可以使用 validateFirst=true 属性，会在校验不通过后停止后续校验
```

### itemType=number 时，鼠标滚轮会造成数字变动

```
可以使用 inputProps={{ onWheel: event => event.currentTarget.blur() }} 来解决
```
