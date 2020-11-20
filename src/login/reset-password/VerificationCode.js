import React, { useState } from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import noPassByInfo from '../../tools/noPassByInfo';
import SendCode from '../common/SendCode';
import request from '../request';
import '../index.less';

export default (props) => {
  const [form] = Form.useForm();
  const {
    proxy,
    setNext,
    account,
    language,
  } = props;
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  // 发送验证码
  const onSend = () => {
    request({
      url: `${proxy}/user/sendVerificationCode.json?type=forget&number=${account}`,
    });
    return false;
  };

  // 校验验证码
  const onFinish = () => {
    setLoading(true);
    request({
      url: `${proxy}/user/checkCode.json`,
      method: 'POST',
      body: {
        code,
        number: account,
        type: 'forget',
      },
      onSuccess: ({ dataObject = {} }) => {
        if (dataObject.flag) {
          setNext(2);
        } else {
          form.setFields([
            {
              name: 'code',
              value: code,
              errors: [language.code_form_error],
            },
          ]);
        }
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="ry_reset_code_account">{noPassByInfo(account)}</div>
      <Form className="ry_reset_code_body" onFinish={onFinish} form={form}>
        <Form.Item name="code">
          <Row gutter={12}>
            <Col span={14}>
              <Input
                size="large"
                onChange={(e) => { setCode(e.target.value.trim()) }}
                placeholder={language.code_input_placeholder}
              />
            </Col>
            <Col span={10}>
              <SendCode
                onBefore={onSend}
                language={language}
              />
            </Col>
          </Row>
        </Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          disabled={code === ''}
          className="ry_common_width_100"
        >{language.next}
        </Button>
      </Form>
    </div>
  );
}
