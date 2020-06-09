import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Spin } from 'antd';
import './index.less';

export default forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  const { url } = props;

  const show = () => {
    setVisible(true);
  };

  const onLoad = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setTip('无法预览，请下载查看');
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <Modal
      width={700}
      footer={false}
      visible={visible}
      onCancel={() => { setVisible(false) }}
      title={<a href={url} download>下载</a>}
    >
      <Spin spinning={loading} tip="图片加载中...">
        <img
          alt={tip}
          src={url}
          onLoad={onLoad}
          onError={onError}
          className="td-img-modal-img"
        />
      </Spin>
    </Modal>
  );
})
