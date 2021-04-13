import React, { useState, useEffect } from 'react';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import { Form, Input, Checkbox, Button } from 'antd';
import storageWorker from '../../tools/storageWorker';
import getUrlParameter from '../../tools/getUrlParameter';
import request from '../request';
import { getLanguage } from '../util';
import classNames from 'classnames';
import '../index.less';

export default (props) => {
  const [form] = Form.useForm();
  const {
    locale = 'en',
    proxy = '/srm', // 代理标示
    isSignUpButton = true, // 是否有注册按钮
    isResetButton = true, // 是否有重置按钮
    onSignUp = () => {}, // 点击注册按钮事件
    onSignIn = () => {}, // 登录成功后
    onResetPassword = () => {}, // 忘记密码点击事件
    customTitle, // 自定义的 title
  } = props;
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const language = getLanguage(locale);

  useEffect(() => {
    storageWorker({
      callback: ({ account, ...rest }) => {
        setRemember(rest.remember);
        form.setFieldsValue({ account });
      },
    });
  }, []);

  const onCheckChange = (e) => { setRemember(e.target.checked) };

  // 登录
  const onFinish = (values) => {
    setLoading(true);
    request({
      isToast: false,
      url: `${proxy}/login.json`,
      method: 'POST',
      body: values,
      onSuccess: ({ dataObject }) => {
        // 缓存账号信息
        storageWorker({
          type: 'set',
          fields: {
            account: remember ? values.account : '',
            remember,
          },
        });
        // 登录成功后的回调函数
        onSignIn({
          dataObject,
          go: getUrlParameter('go'),
        });
      },
      onError: () => {
        form.setFields([
          {
            name: 'account',
            value: values.account,
            errors: [''],
          }, {
            name: 'password',
            value: values.password,
            errors: [language.login_input_error],
          },
        ]);
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="ry_login_container">
      {customTitle || <div className="ry_login_title">{language.login_title}</div>}
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: language.login_input_account_message,
            },
          ]}
        >
          <Input
            size="large"
            placeholder={language.login_input_account_placeholder}
            prefix={<UserOutlined className="ry_prefixIcon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: language.login_input_password_message,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={language.login_input_password_placeholder}
            prefix={<LockOutlined className="ry_prefixIcon" />}
          />
        </Form.Item>
        <div className="ry_login_remember">
          <Checkbox checked={remember} onChange={onCheckChange}>
            {language.login_remember_text}
          </Checkbox>
        </div>
        <div className="ry_login_submit">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            className={classNames({
              ry_submit_sign_in: !isSignUpButton,
            })}
          >{language.login_button_ok_text}
          </Button>
          {isSignUpButton && (
            <Button
              size="large"
              onClick={onSignUp}
            >{language.login_create_account_text}
            </Button>
          )}
        </div>
      </Form>
      {isResetButton && (
        <div className="ry_login_footer">
          <a onClick={onResetPassword}>
            {language.login_forget_text}
          </a>
        </div>
      )}
    </div>
  );
};
