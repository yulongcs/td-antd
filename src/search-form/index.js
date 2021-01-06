import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Button, Row } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import './index.less';

export default forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const {
    className,
    children,
    extraNode,
    expandNode,
    callback = () => {},
    ...rest
  } = props;
  const [collapse, setCollapse] = useState(false);

  useImperativeHandle(ref, () => ({
    form,
    reset,
  }));

  const reset = () => {
    form.resetFields();
    callback('reset' ,{});
  };

  return (
    <Form
      {...rest}
      form={form}
      autoComplete="off"
      requiredMark={false}
      className={classNames('td-search-form-wrap', className)}
      onFinish={(values) => { callback('query', values) }}
    >
      <Row gutter={12}>{children}{collapse && expandNode}</Row>
      <div className="td-search-form-handle-box">
        <div>{extraNode}</div>
        <div>
          <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button onClick={reset} icon={<ReloadOutlined />} style={{ marginLeft: 8 }}>重置</Button>
          {expandNode && (
            <a style={{ fontSize: 12, marginLeft: 8 }} onClick={() => { setCollapse(!collapse) }}>
              {collapse ? '收起' : '展开'} {collapse ? <UpOutlined /> : <DownOutlined />}
            </a>
          )}
        </div>
      </div>
    </Form>
  );
});
