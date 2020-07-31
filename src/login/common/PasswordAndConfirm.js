import React, { useState } from 'react';
import { Form, Input, Popover, Progress } from 'antd';

const FormItem = Form.Item;
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

export default (props) => {
  const {
    form,
    language,
    isLabel = true,
  } = props;
  const [visible, setVisible] = useState(false);
  const passwordStatusMap = {
    ok: <div>{language.reset_popover_0}：{language.reset_popover_1}</div>,
    pass: <div>{language.reset_popover_0}：{language.reset_popover_2}</div>,
    poor: <div>{language.reset_popover_0}：{language.reset_popover_3}</div>,
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      setVisible(!!value);
      callback(language.login_input_password_message);
    } else {
      if (!visible) {
        setVisible(!!value);
      }

      if (value.length < 6) {
        callback(' ');
      } else {
        callback();
      }
    }
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback(language.reset_password_two);
    } else {
      callback();
    }
  };

  return (
    <React.Fragment>
      <FormItem label={isLabel ? language.reset_new_password_label : null}>
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode;
            }
            return node;
          }}
          content={
            <div style={{ padding: '4px 0' }}>
              {passwordStatusMap[getPasswordStatus()]}
              {renderPasswordProgress()}
              <div style={{ marginTop: 10 }}>{language.reset_popover_tip}</div>
            </div>
          }
          visible={visible}
          placement="rightTop"
          overlayStyle={{ width: 240, zIndex: 999 }}
        >
          {form.getFieldDecorator('password', {
            rules: [{validator: checkPassword}],
          })(<Input maxLength={20} size="large" type="password" placeholder={language.reset_new_password_placeholder} />)}
        </Popover>
      </FormItem>
      <FormItem label={isLabel ? language.reset_confirm_password_label : null}>
        {form.getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: language.reset_confirm_password_error,
            },
            {
              validator: checkConfirm,
            },
          ],
          validateFirst: true,
          validateTrigger: false,
        })(<Input maxLength={20} size="large" type="password" placeholder={language.reset_confirm_password_placeholder} />)}
      </FormItem>
    </React.Fragment>
  );
}
