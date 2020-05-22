import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import SendCode from '../common/SendCode';
import PasswordAndConfirm from '../common/PasswordAndConfirm';
import request from '../request';
import '../index.less';

const FormItem = Form.Item;

export default Form.create()((props) => {
  const {
    form,
    proxy,
    locale,
    setType,
    language,
    onRegister = () => {}, // 注册成功后的回调
  } = props;
  const [loading, setLoading] = useState(false);

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
  const onSubmit = (e) => {
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
            onRegister(dataObject);
          },
        }).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <div className="ry_register_container">
      <div className="ry_login_title">{language.register_title}</div>
      <FormItem hasFeedback>
        {form.getFieldDecorator('account', {
          rules: [
            {
              required: true,
              whitespace: true,
              message: language.register_account_tip,
            },
            {
              asyncValidator: validateAccountExist,
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input size="large" placeholder={language.register_account_placeholder} />)}
      </FormItem>
      <FormItem hasFeedback>
        {form.getFieldDecorator('email', {
          rules: [
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
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input size="large" placeholder={language.register_email_placeholder} />)}
      </FormItem>
      <FormItem>
        <Row gutter={6}>
          <Col span={14}>
            {form.getFieldDecorator('verificationCode', {
              rules: [
                {
                  required: true,
                  message: language.code_input_placeholder,
                },
              ],
              validateTrigger: false,
            })(<Input size="large" placeholder={language.code_input_placeholder} />)}
          </Col>
          <Col span={10}>
            <SendCode
              onBefore={onSend}
              language={language}
            />
          </Col>
        </Row>
      </FormItem>
      <PasswordAndConfirm form={form} language={language} isLabel={false} />
      <div className="ry_register_btns">
        <Button
          size="large"
          type="primary"
          loading={loading}
          style={{ width: 108 }}
          onClick={onSubmit}
        >
          {language.register_create_text}
        </Button>
        <a onClick={() => {setType('login')}}>{language.register_back}</a>
      </div>
    </div>
  );
})
