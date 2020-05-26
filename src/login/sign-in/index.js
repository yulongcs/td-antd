import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import storageWorker from '../../tools/storageWorker';
import getUrlParameter from '../../tools/getUrlParameter';
import request from '../request';
import { getLanguage } from '../util';
import classNames from 'classnames';
import '../index.less';

const FormItem = Form.Item;

export default Form.create()((props) => {
  const {
    form,
    locale = 'en',
    proxy = '/srm', // 代理标示
    isSignUpButton = true, // 是否有注册按钮
    isResetButton = true, // 是否有重置按钮
    onSignUp = () => {}, // 点击注册按钮事件
    onSignIn = () => {}, // 登录成功后
    onResetPassword = () => {}, // 忘记密码点击事件
    customTitle, // 自定义的 title
  } = props;
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);
  const [storage, setStorage] = useState({});
  const [remember, setRemember] = useState(false);
  const language = getLanguage(locale);

  useEffect(() => {
    storageWorker({
      callback: (res) => {
        setStorage(res);
        setRemember(res.remember);
      },
    });
  }, []);

  const onCheckChange = (e) => { setRemember(e.target.checked) };

  // 登录
  const onSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
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
            form.setFields({
              account: {
                value: values.account,
                errors: [new Error()],
              },
              password: {
                value: values.password,
                errors: [new Error(language.login_input_error)],
              },
            });
          },
        }).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <div className="ry_login_container">
      {customTitle || <div className="ry_login_title">{language.login_title}</div>}
      <div className="ry_login_body">
        <FormItem>
          {getFieldDecorator('account', {
            initialValue: storage.account,
            rules: [
              {
                required: true,
                message: language.login_input_account_message,
              },
            ],
          })(
            <Input
              size="large"
              placeholder={language.login_input_account_placeholder}
              prefix={<Icon type="user" className="ry_prefixIcon" />}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: language.login_input_password_message,
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              placeholder={language.login_input_password_placeholder}
              prefix={<Icon type="lock" className="ry_prefixIcon" />}
            />
          )}
        </FormItem>
        <div className="ry_login_remember">
          <Checkbox checked={remember} onChange={onCheckChange}>
            {language.login_remember_text}
          </Checkbox>
        </div>
        <div className="ry_login_submit">
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={onSubmit}
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
      </div>
      {isResetButton && (
        <div className="ry_login_footer">
          <a onClick={onResetPassword}>
            {language.login_forget_text}
          </a>
        </div>
      )}
    </div>
  );
});
