import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button, Popover } from 'antd';
import './index.less';

export default forwardRef((props, ref) => {
  const {
    okText = '确定',
    cancelText = '取消',
    okButtonProps = {},
    cancelButtonProps = {},
    content,
    onOk,
    onCancel,
    confirmLoading,
    ...rest
  } = props;
  const [visible, setVisible] = useState(false);

  const ok = () => {
    // eslint-disable-next-line
    onOk ? onOk() : setVisible(false);
  };

  const cancel = () => {
    // eslint-disable-next-line
    onCancel ? onCancel() : setVisible(false);
  };

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    visible: (bool) => { setVisible(bool) },
  }));

  const contentNode = () => {
    return (
      <React.Fragment>
        <div className="td-popover-content">{content}</div>
        <div className="td-popover-footer">
          <Button size="small" onClick={cancel} {...cancelButtonProps}>{cancelText}</Button>
          <Button size="small" type="primary" onClick={ok} {...okButtonProps} loading={confirmLoading}>{okText}</Button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Popover
      {...rest}
      visible={visible}
      overlayClassName="td-popover-box"
      content={contentNode()}
      onVisibleChange={(v) => { setVisible(v) }}
      trigger="click"
    >
      {props.children}
    </Popover>
  );
})
