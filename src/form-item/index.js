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
    nonZero = false,
    message = '必填项',
    show = true,
    ...rest
  } = props;

  const rules = [{ required, message }].concat(extraRules).concat({
    validator: (rule, value, callback) => {
      validatorCallback(value, callback, rule);

      // 当类型为数字类型时，则内置校验规则
      if (itemType === 'number') {
        if (nonZero && +value === 0) {
          callback('不能为 0');
          return;
        }

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
