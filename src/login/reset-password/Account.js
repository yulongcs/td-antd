import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { REGEXP } from '../actions';
import request from '../request';
import '../index.less';

export default (props) => {
  const [form] = Form.useForm();
  const {
    proxy, // 代理标示
    setAccount,
    setNext,
    language,
    onSignIn = () => {},
  } = props;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // 校验
  const validateValue = () => {
    const { account } = form.getFieldsValue();

    setDisabled(!(REGEXP.mail.test(account) || REGEXP.phone.test(account)));
  };

  const onFinish = ({ account }) => {
    setLoading(true);
    request({
      url: `${proxy}/user/getAccount.json?name=${account}`,
      onSuccess: ({ dataObject: r }) => {
        if (r.exists) {
          setAccount(account);
          setNext(1);
        } else {
          form.setFields([
            {
              name: 'account',
              value: account,
              errors: [language.confirm_account_error],
            },
          ]);
        }
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Form className="ry_reset_account_box" onFinish={onFinish} form={form}>
      <Form.Item name="account">
        <Input
          size="large"
          placeholder={language.confirm_account_input_placeholder}
          onChange={() => { validateValue() }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          loading={loading}
          htmlType="submit"
          disabled={disabled}
          className="ry_common_width_100"
        >
          {language.next}
        </Button>
      </Form.Item>
      <div className="ry_common_text_center">
        <a onClick={onSignIn}>{language.confirm_account_back}</a>
      </div>
    </Form>
  );
}
