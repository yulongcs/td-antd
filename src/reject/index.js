import React, { useState, cloneElement, useImperativeHandle, forwardRef } from 'react';
import cx from 'classnames';
import { Modal, Input } from 'antd';
import './index.less';

export default forwardRef((props, ref) => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    min,
    max = 200,
    onOk = () => {},
    placeholder = '请填写拒绝原因',
    title = '拒绝原因',
    ...rest
  } = props;

  const crumbs = React.Children.map(props.children, (element, index) => (cloneElement(element, {
    key: index,
    onClick: () => { setVisible(true) },
  })));

  const onChange = ({ target }) => {
    setText(target.value);
  };

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    visible: setVisible,
  }));

  return (
    <React.Fragment>
      {crumbs}
      <Modal
        {...rest}
        title={title}
        visible={visible}
        maskClosable={false}
        onCancel={() => { setVisible(false) }}
        okButtonProps={{ disabled: !text.trim() }}
        afterClose={() => {
          setText('');
          setShowError(false);
        }}
        onOk={() => {
          if (min && text.trim().length < +min) {
            setShowError(true);
          } else {
            onOk(text, setVisible);
          }
        }}
      >
        <div className="td-reject-wrap">
          <Input.TextArea
            showCount
            value={text}
            maxLength={max}
            onChange={onChange}
            placeholder={placeholder}
            autoSize={{ minRows: 6, maxRows: 6 }}
            onFocus={() => { setShowError(false) }}
          />
          <div className={cx('td-reject-default-error', { 'td-reject-show-error': showError })}>不能少于{min}个字符</div>
        </div>
      </Modal>
    </React.Fragment>
  );
})
