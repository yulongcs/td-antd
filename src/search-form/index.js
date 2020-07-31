/*
* 请使用 wrappedComponentRef 代替常规的 ref
* */

import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Button, Row } from 'antd';
import './index.less';

export default Form.create()(forwardRef((props, ref) => {
  const {
    form,
    callback = () => {},
    btnText = '查询',
    children,
    extraNode,
    buttonProps = {},
  } = props;

  useImperativeHandle(ref, () => ({
    reset,
    form,
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      callback(values);
    });
  };

  const reset = () => {
    form.resetFields();
  };

  return (
    <Form
      hideRequiredMark
      autoComplete="off"
      className="td-list-form"
      onSubmit={handleSearch}
    >
      <Row>
        {children({ form, required: false })}
        {btnText && btnText !== '' && <Button htmlType="submit" {...buttonProps}>{btnText}</Button>}
        {extraNode}
      </Row>
    </Form>
  );
}));
