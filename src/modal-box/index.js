import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Spin } from 'antd';
import classNames from 'classnames';
import './index.less';

export default forwardRef((props, ref) => {
  const {
    width = 500,
    onOk,
    onCancel,
    bodyStyle,
    wrapClassName,
    buttonPosition = 'right',
    children,
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
    <Modal
      width={width}
      visible={visible}
      onOk={ok}
      onCancel={cancel}
      destroyOnClose
      maskClosable={false}
      wrapClassName={classNames('td-modal-box', `td-modal-footer-${buttonPosition}`, wrapClassName)}
      bodyStyle={{
        maxHeight: 520,
        overflowY: 'auto',
        ...bodyStyle,
      }}
      {...rest}
    >
      <Spin spinning={!!rest.confirmLoading} tip={rest.confirmLoading}>
        {children}
      </Spin>
    </Modal>
  );
})
