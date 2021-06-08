import React, { useState } from 'react';
import { Spin } from 'antd';
import localConfig from '../local-config';
import './index.less';

// 函数用法
function downloadBlob(params) {
  const { url, filename, body } = params;
  const { proxy = '' } = localConfig.newInstance(); // 获取实例
  const newOptions = { credentials: 'include', body };

  if (body) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.method = 'POST';
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(`${proxy}${url}`, newOptions)
    .then(response => response.blob().then(blob => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const value = e.target.result;
        try {
          const json = JSON.parse(value);
          alert(json.errorMessage);
        }
        catch(e) {
          const name = filename || response.headers.get('Content-Disposition');
          // for IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
          } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
            const blobUrl = window.URL.createObjectURL(blob);
            // 获取 headers 中的文件名
            a.href = blobUrl;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(blobUrl);
            a.remove();
          }
        }
      };
      reader.readAsText(blob)
    }))
}

// 组件使用
const DownloadBlob = (props) => {
  const {
    url,
    body,
    filename,
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);

  const click = () => {
    if (!loading) {
      setLoading(true);
      downloadBlob({
        url,
        body,
        filename,
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <Spin spinning={loading} size="small" wrapperClassName="td-download-loading">
      <div
        {...rest}
        onClick={click}
        className="td-download-wrap"
      />
    </Spin>
  );
};

DownloadBlob.use = () => [downloadBlob];

export default DownloadBlob;
