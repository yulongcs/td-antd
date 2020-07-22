---
title: FormItem
---

## FormItem

基于 Form.Item 的二次封装，可灵活的搭建表单内容。

### 基础表单

```jsx
import React from 'react';
import { Form, Button, Switch } from 'antd';
import FormItem from './index';

export default Form.create()(({ form }) => {
  const formProps = {
    form,
    cols: [10, 12],
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  
  return (
    <React.Fragment>
      <FormItem
        {...formProps}
        label="姓名"
        fieldName="name"
        decoratorOptions={{
          validateFirst: true
        }}
      />
      <FormItem
        {...formProps}
        label="年龄（失去焦点后校验）"
        fieldName="age"
        itemType="number"
        decoratorOptions={{
          validateTrigger: 'onBlur'
        }}
      />
      <FormItem
        {...formProps}
        label="性别"
        fieldName="sex"
      />
      <FormItem
        {...formProps}
        label="开关"
        fieldName="switch"
        initialValue={true}
        required={false}
        decoratorOptions={{
          valuePropName: 'checked'
        }}
      >
        <Switch />
      </FormItem>
      <Button onClick={onSubmit}>提交</Button>
    </React.Fragment>
  );
})
```

## API

支持原 [Form](https://ant-design.gitee.io/components/form-cn/) API

|参数|说明|类型|默认值|版本|
|:--|:--|:--|:--|:--|
|form|经 Form.create() 包装过的组件会自带 this.props.form 属性，直接传给 FormItem 即可。`如果无，则该表单为“只读”`|object||
|formItemLayout|表单布局样式|object|`{labelCol: { sm: { span: 10 } },wrapperCol: { sm: { span: 14 } }}`|
|cols| formItemLayout 的简使用，数组表示左右占有空间，合计24|Array|[10, 14]|
|initialValue|初始值，回显使用|string||
|label|标签|string||
|fieldName|字段名，`必须有`|string||
|required|表单项是否为必填|boolean|true|
|validatorCallback|自定义校验规则，必须返回callback('错误码')|function(value, callback)||
|extra|表单下方的提示文案|string||
|children|子节点| reactNode |`<Input />`|
|extraRules|额外的规则，用法同 rules|array / object|[ ]|
|inputProps|Input 组件的属性 API|object|{ }|
|defaultValue|在预览状态下，值为空时默认展示的字符|string|'--'|1.3.3|
|itemType|申明组件类型，普通组件(default) / Number组件(number)|string|default|
|decoratorOptions|支持原生的装饰器选项|object|{}|1.5.3|

> 当 itemType="number" 时，只能输入数字，并可以使用以下属性<br />
> 遵循 input 的 type="number" 的 w3c 规则

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|unit|显示单位|string|-|
|isNegative|是否为负数，默认不可以| boolean |false|
|isInteger|是否为整数，默认不是|boolean |false|

> 注意：暂不支持 antd 4.x 版本

## FAQ

### FormItem 包裹 Upload 时，非空不校验

```
decoratorOptions: {
  valuePropName: 'fileList',
  getValueFromEvent: e => (!e || !e.fileList) ? e : e.fileList,
}
```
