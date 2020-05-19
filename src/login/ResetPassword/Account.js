import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { REGEXP } from '../actions';
import request from '../request';
import '../index.less';

const FormItem = Form.Item;

export default Form.create()((props) => {
  const {
    form,
    proxy, // 代理标示
    setAccount,
    setNext,
    setType,
    language,
  } = props;
  const [loading, setLoading] = useState(false);

  // 校验
  const validateValue = () => {
    const { account: v } = form.getFieldsValue();

    return !(REGEXP.mail.test(v) || REGEXP.phone.test(v));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, { account }) => {
      if (!err) {
        setLoading(true);
        request({
          url: `${proxy}/user/getAccount.json?name=${account}`,
          onSuccess: ({ dataObject: r }) => {
            if (r.exists) {
              setAccount(account);
              setNext(1);
            } else {
              form.setFields({
                account: {
                  value: account,
                  errors: [new Error(language.confirm_account_error)],
                },
              });
            }
          },
        }).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <div className="ry_reset_account_box">
      <FormItem>
        {form.getFieldDecorator('account')(
          <Input
            size="large"
            placeholder={language.confirm_account_input_placeholder}
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          size="large"
          loading={loading}
          htmlType="submit"
          disabled={validateValue()}
          onClick={onSubmit}
          className="ry_common_width_100"
        >
          {language.next}
        </Button>
      </FormItem>
      <div className="ry_common_text_center">
        <a onClick={() => { setType('login') }}>{language.confirm_account_back}</a>
      </div>
    </div>
  );
})
