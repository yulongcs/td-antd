import * as React from 'react';
import { Input, Form } from 'antd';

export default ({ className, children, ...rest }) => {
  const { cols = [] } = rest;
  const {
    formItemLayout = {
      labelCol: { sm: { span: cols[0] || 10 } },
      wrapperCol: { sm: { span: cols[1] || 14 } },
    },
    form,
    label = '',
    fieldName = '',
    initialValue = undefined,
    required = true,
    validatorCallback = () => {},
    extraRules = [],
    inputProps = {},
    itemType = 'default',
    unit,
    isNegative = false,
    isInteger = false,
    message = '必填项',
    defaultValue = '--',
    decoratorOptions = {},
  } = rest;

  if (!form) {
    return (
      <Form.Item
        style={{ marginBottom: 0 }}
        className={className}
        {...formItemLayout}
        {...rest}
        label={label}
      >
        {children || initialValue || defaultValue}
      </Form.Item>
    );
  }

  const rules = [{ required, message }, {
    validator: (rule, value, callback) => {
      validatorCallback(value, callback, rule);

      // 当类型为数字类型时，则内置校验规则
      if (itemType === 'number') {
        if (!isNegative && value < 0) {
          callback(`${label} 不能小于 0`);
          return;
        }

        if (isInteger && value && !Number.isInteger(parseFloat(value))) {
          callback('必须为整数');
          return;
        }
      }

      callback();
    },
  }].concat(extraRules);

  return (
    <Form.Item
      className={className}
      {...formItemLayout}
      {...rest}
    >
      {form.getFieldDecorator(fieldName, {
        rules,
        initialValue,
        ...decoratorOptions,
      })(
        (itemType === 'number') ?
          <Input type="number" suffix={unit} /> :
          (children || <Input {...inputProps} />)
      )}
    </Form.Item>
  );
}
