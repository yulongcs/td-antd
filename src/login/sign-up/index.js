import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import SendCode from '../common/SendCode';
import PasswordAndConfirm from '../common/PasswordAndConfirm';
import request from '../request';
import { getLanguage } from '../util';
import '../index.less';

export default (props) => {
  const [form] = Form.useForm();
  const {
    locale = 'zh',
    proxy = '/srm', // 代理标示
    onSignIn = () => {}, // 点击去登录的回调
    onSignUp = () => {}, // 注册成功后的回调
  } = props;
  const [loading, setLoading] = useState(false);
  const language = getLanguage(locale);

  // 验证用户名/邮箱的有效性
  const validateAccountExist = (rule, value, callback) => {
    if (/\S+/.test(value)) {
      request({
        isToast: false,
        url: `${proxy}/user/getAccount.json?name=${value}`,
        onSuccess: ({ dataObject }) => {
          if (!dataObject.exists) {
            callback();
          } else {
            callback(language.register_account_error.replace('$1', value));
          }
        },
        onError: () => { callback('') },
      });
    }
  };

  // 发送邮箱验证码
  const onSend = () => {
    return new Promise((resolve) => {
      form.validateFields(['email'], (err, { email }) => {
        if (!err) {
          resolve();
          request({
            url: `${proxy}/user/sendVerificationCode.json?number=${email}&type=regist&isInland=${locale === 'zh'}`,
          });
        }
      });
    });
  };

  // 注册
  const onFinish = (e) => {
    e.preventDefault();
    form.validateFields({ first: true }, (err, values) => {
      if (!err) {
        setLoading(true);
        request({
          url: `${proxy}/user/register.json`,
          method: 'POST',
          body: values,
          onSuccess: ({ dataObject = {} }) => {
            message.success(language.register_success);
            onSignUp(dataObject);
          },
        }).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <Form className="ry_register_container" onFinish={onFinish}>
      <div className="ry_login_title">{language.register_title}</div>
      <Form.Item
        hasFeedback
        name="account"
        rules={[
          {
            required: true,
            whitespace: true,
            message: language.register_account_tip,
          },
          {
            asyncValidator: validateAccountExist,
          },
        ]}
      >
        <Input size="large" placeholder={language.register_account_placeholder} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="email"
        rules={[
          {
            required: true,
            whitespace: true,
            message: language.register_email_tip,
          },
          {
            type: 'email',
            message: language.register_email_tip2,
          },
          {
            asyncValidator: validateAccountExist,
          },
        ]}
      >
        <Input size="large" placeholder={language.register_email_placeholder} />
      </Form.Item>
      <Form.Item
        name="verificationCode"
        rules={[
          {
            required: true,
            message: language.code_input_placeholder,
          },
        ]}
      >
        <Row gutter={6}>
          <Col span={14}>
            <Input size="large" placeholder={language.code_input_placeholder} />
          </Col>
          <Col span={10}>
            <SendCode
              onBefore={onSend}
              language={language}
            />
          </Col>
        </Row>
      </Form.Item>
      <PasswordAndConfirm form={form} language={language} isLabel={false} />
      <div className="ry_register_btns">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: 108 }}
        >
          {language.register_create_text}
        </Button>
        <a onClick={onSignIn}>{language.register_back}</a>
      </div>
    </Form>
  );
}
