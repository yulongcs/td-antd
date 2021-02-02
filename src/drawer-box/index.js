import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Drawer, Button } from 'antd';

export default forwardRef((props, ref) => {
  const {
    onOk,
    onCancel,
    okText = '确定',
    cancelText = '取消',
    afterClose = () => {},
    okButtonProps = {},
    cancelButtonProps = {},
    ...rest
  } = props;
  const [visible, setVisible] = useState(false);

  const ok = () => {
    if (onOk) {
      onOk();
      return;
    }
    setVisible(false);
  };

  const cancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    setVisible(false);
  };

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    visible: setVisible,
  }));

  return (
    <Drawer
      visible={visible}
      onClose={cancel}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={cancel} style={{ marginRight: 8 }} {...cancelButtonProps}>{cancelText}</Button>
          <Button onClick={ok} type="primary" {...okButtonProps}>{okText}</Button>
        </div>
      }
      afterVisibleChange={(v) => {
        if (!v) {
          afterClose();
        }
      }}
      {...rest}
    />
  );
})
