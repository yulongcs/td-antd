import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Button, Row, Col, Input } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [collapse, setCollapse] = useState(false);
  const {
    span = 8,
    columns = [],
    callback = () => {},
    ...rest
  } = props;

  useImperativeHandle(ref, () => ({ form, reset }));

  // 重置表单
  const reset = () => {
    form.resetFields();
    callback('reset' ,{});
  };

  if (columns.length > 0) {
    const isCollapse = (columns.length+1)*span > 24; // 是否需要开启"展开/收起"
    const nowColumns = isCollapse ? (collapse ? columns : columns.slice(0, (24-span)/span)) : columns;
    const offset = 24-((nowColumns.length * span)%24+span); // 操作栏的偏移量

    return (
      <Form
        {...rest}
        form={form}
        autoComplete="off"
        requiredMark={false}
        onFinish={(values) => { callback('query', values) }}
      >
        <Row gutter={12}>
          {nowColumns.map(i => (
            <Col span={span}>
              <Form.Item
                label={i.title2 || i.title}
                name={i.dataIndex2 || i.dataIndex}
                {...i.formItemProps}
              >
                {i.component || <Input {...i.inputProps} />}
              </Form.Item>
            </Col>
          ))}
          <Col span={span} style={{ textAlign: 'right', height: 56 }} offset={offset}>
            <Button htmlType="submit" type="primary">查询</Button>
            <Button onClick={reset} style={{ marginLeft: 8 }}>重置</Button>
            {isCollapse && (
              <a style={{ fontSize: 12, marginLeft: 8 }} onClick={() => { setCollapse(!collapse) }}>
                {collapse ? '收起' : '展开'} {collapse ? <UpOutlined /> : <DownOutlined />}
              </a>
            )}
          </Col>
        </Row>
      </Form>
    );
  }

  return null;
});
