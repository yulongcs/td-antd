import React, { useState } from 'react';
import { Spin } from 'antd';
import LinkBtn from '../link-btn';
import downloadBlob from '../tools/downloadBlob';

export default (props) => {
  const {
    url,
    body,
    filename,
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <LinkBtn
      disabled={loading}
      onClick={() => {
        setLoading(true);
        downloadBlob({
          url,
          body,
          filename,
        }).finally(() => {
          setLoading(false);
        });
      }}
    >
      {loading ? <Spin size="small" spinning={loading} />  : '下载'}
    </LinkBtn>
  );
}
