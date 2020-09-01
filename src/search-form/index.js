/*
* 请使用 wrappedComponentRef 代替常规的 ref
* */

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Button, Row, Icon } from 'antd';
import classNames from 'classnames';
import './index.less';

export default Form.create()(forwardRef((props, ref) => {
  const {
    form,
    className,
    children,
    extraNode,
    expandNode,
    callback = () => {},
  } = props;
  const [collapse, setCollapse] = useState(false);

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
      className={classNames('td-search-form-wrap', className)}
      onSubmit={handleSearch}
    >
      <Row gutter={12}>
        {children && children({ form, required: false })}
        {expandNode && collapse && expandNode({ form, required: false })}
      </Row>
      <div className="td-search-form-handle-box">
        <div>{extraNode}</div>
        <div>
          <Button htmlType="submit" type="primary" icon="search">查询</Button>
          <Button onClick={reset} icon="reload" style={{ marginLeft: 8 }}>重置</Button>
          {expandNode && (
            <a style={{ fontSize: 12, marginLeft: 8 }} onClick={() => { setCollapse(!collapse) }}>
              {collapse ? '收起' : '展开'} <Icon type={collapse ? 'up' : 'down'} />
            </a>
          )}
        </div>
      </div>
    </Form>
  );
}));
