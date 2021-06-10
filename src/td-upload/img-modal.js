import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Spin } from 'antd';
import LinkBtn from '../link-btn';
import typeOf from '../tools/typeOf';
import './index.less';

export default forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  const { url, showDownLoad, beforeDownload } = props;

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

  const toDownLoad = () => {
    function download() {
      const a = document.createElement('a'); // 创建a标签
      a.setAttribute('download', '');// download属性
      a.setAttribute('href', url);// href链接
      a.click();// 自执行点击事件
    }
    if (beforeDownload && (typeOf(beforeDownload, 'Promise'))) {
      return beforeDownload().then(() => {
        download();
      })
    }
    download();
  }

  return (
    <Modal
      width={700}
      footer={false}
      visible={visible}
      onCancel={() => { setVisible(false) }}
      title={showDownLoad ? <LinkBtn onClick={toDownLoad}>下载</LinkBtn>: '预览'}
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
