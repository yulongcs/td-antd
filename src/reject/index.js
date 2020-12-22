import React, { useState, cloneElement } from 'react';
import cx from 'classnames';
import { Modal, Input } from 'antd';
import './index.less';

export default (props) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    min,
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

  return (
    <React.Fragment>
      {crumbs}
      <Modal
        {...rest}
        title={title}
        visible={visible}
        maskClosable={false}
        confirmLoading={loading}
        onCancel={() => { setVisible(false) }}
        okButtonProps={{ disabled: !text.trim() }}
        afterClose={() => {
          setText('');
          setLoading(false);
          setShowError(false);
        }}
        onOk={() => {
          if (min && text.trim().length < +min) {
            setShowError(true);
          } else {
            onOk(text, setVisible, setLoading);
          }
        }}
      >
        <div className="td-reject-wrap">
          <Input.TextArea
            value={text}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => { setShowError(false) }}
            className={showError && 'td-reject-input-error'}
          />
          <div className={cx('td-reject-default-error', { 'td-reject-show-error': showError })}>不能少于{min}个字符</div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
