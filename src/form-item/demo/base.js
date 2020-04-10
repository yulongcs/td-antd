import React from 'react';
import { Form, Button, Switch } from 'antd';
import FormItem from '../index';

@Form.create()
export default class Base extends React.Component {
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    })
  };

  render() {
    const { form } = this.props;
    const formProps = {
      form,
      cols: [5, 10],
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
        <Button onClick={() => this.onSubmit()}>提交</Button>
      </React.Fragment>
    );
  }
}