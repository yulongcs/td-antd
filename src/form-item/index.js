import * as React from 'react';
import { Input, Form } from 'antd';

export default (props) => {
  const {
    className,
    children,
    required = true,
    validatorCallback,
    extraRules = [],
    inputProps = {},
    itemType = 'default',
    unit,
    isNegative = false,
    isInteger = false,
    nonZero = false,
    message = '必填项',
    show = true,
    ...rest
  } = props;

  const rules = [{ required, message }].concat(extraRules).concat({
    validator: (rule, value, callback) => {
      // 当类型为数字类型时，则内置校验规则
      if (itemType === 'number') {
        if (nonZero && +value === 0) {
          return Promise.reject(new Error('不能为 0'));
        }

        if (!isNegative && value < 0) {
          return Promise.reject(new Error('不能小于 0'));
        }

        if (isInteger && value && !Number.isInteger(parseFloat(value))) {
          return Promise.reject(new Error('必须为整数'));
        }
      }

      if (validatorCallback) {
        return validatorCallback(value, callback, rule);
      } else {
        return Promise.resolve();
      }
    },
  });

  if (show) {
    return (
      <Form.Item
        rules={rules}
        className={className}
        required={required}
        {...rest}
      >
        {
          (itemType === 'number') ?
            <Input type="number" suffix={unit} {...inputProps} /> :
            (children || <Input {...inputProps} />)
        }
      </Form.Item>
    );
  }

  return null;
}
