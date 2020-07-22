import React, { useState } from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import noPassByInfo from '../../../tools/noPassByInfo';
import SendCode from '../common/SendCode';
import request from '../request';
import '../index.less';

const FormItem = Form.Item;

export default Form.create()((props) => {
  const {
    form,
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
  const onSubmit = (e) => {
    e.preventDefault();
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
          form.setFields({
            code: {
              value: code,
              errors: [new Error(language.code_form_error)],
            },
          });
        }
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="ry_reset_code_account">{noPassByInfo(account)}</div>
      <div className="ry_reset_code_body">
        <FormItem>
          <Row gutter={12}>
            <Col span={14}>
              {form.getFieldDecorator('code')(
                <Input
                  size="large"
                  onChange={(e) => { setCode(e.target.value.trim()) }}
                  placeholder={language.code_input_placeholder}
                />
              )}
            </Col>
            <Col span={10}>
              <SendCode
                onBefore={onSend}
                language={language}
              />
            </Col>
          </Row>
        </FormItem>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={onSubmit}
          disabled={code === ''}
          className="ry_common_width_100"
        >{language.next}
        </Button>
      </div>
    </div>
  );
})
