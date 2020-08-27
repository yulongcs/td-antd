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
    children,
    extraNode,
  } = props;

  useImperativeHandle(ref, () => ({
    reset,
    form,
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      callback('query', values);
    });
  };

  const reset = () => {
    form.resetFields();
    callback('reset' ,{});
  };

  return (
    <Form
      hideRequiredMark
      autoComplete="off"
      className="td-list-form"
      onSubmit={handleSearch}
    >
      <Row gutter={[12, 12]}>{children({ form, required: false })}</Row>
      <div className="td-search-form-handle-box">
        <div>{extraNode}</div>
        <div>
          <Button onClick={reset} icon="reload">重置</Button>
          &nbsp;&nbsp;&nbsp;
          <Button htmlType="submit" type="primary" icon="search">查询</Button>
        </div>
      </div>
    </Form>
  );
}));
