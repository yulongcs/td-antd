import * as React from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import './index.less';

export default class ModalBox extends React.Component {
  state = {
    visible: false,
  };

  show = (cb) => {
    // 显示模态框
    this.setState({
      visible: true,
    }, () => {
      // eslint-disable-next-line
      cb && cb();
    });
  };

  hide = (cb) => {
    // 模态框消失
    this.setState({
      visible: false,
    }, () => {
      // eslint-disable-next-line
      cb && cb();
    });
  };

  ok = () => {
    // 点击确定按钮
    const { handleOk } = this.props;
    if (handleOk) {
      handleOk();
      return;
    }
    this.hide();
  };

  cancel = () => {
    // 点击取消按钮
    const { handleCancel } = this.props;
    if (handleCancel) {
      handleCancel();
      return;
    }
    this.hide();
  };

  render() {
    const { visible } = this.state;
    const {
      width = 500,
      children,
      wrapClassName,
    } = this.props;

    return (
      <Modal
        width={width}
        visible={visible}
        onOk={this.ok}
        onCancel={this.cancel}
        destroyOnClose
        maskClosable={false}
        wrapClassName={classNames('td-modal-box', wrapClassName)}
        {...this.props}
      >
        {children}
      </Modal>
    );
  }
}
