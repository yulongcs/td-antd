import * as React from 'react';
import { Input, Form } from 'antd';
// import { FormContext } from 'antd/es/form/context'; // 获取form对象的 context 对象

export default (props) => {
  // const { labelCol, wrapperCol } = React.useContext(FormContext);
  const {
    className,
    children,
    required = true,
    validatorCallback = () => {},
    extraRules = [],
    inputProps = {},
    itemType = 'default',
    unit,
    isNegative = false,
    isInteger = false,
    message = '必填项',
    ...rest
  } = props;

  const rules = [{ required, message }, {
    validator: (rule, value, callback) => {
      validatorCallback(value, callback, rule);

      // 当类型为数字类型时，则内置校验规则
      if (itemType === 'number') {
        if (!isNegative && value < 0) {
          callback('不能小于 0');
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
      rules={rules}
      className={className}
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
