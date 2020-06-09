import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cx from 'classnames';
import { Upload, Button, message } from 'antd';
import ImgModal from './img-modal';
import onInitialFiles from './onInitialFiles';
import isPromise from '../tools/isPromise';
import './index.less';

let num = 0; // 上传文件计数

const TdUpload = forwardRef((props, ref) => {
  const {
    tip,
    url = '',
    initialFiles,
    wrapClassName,
    isPreview = false,
    params = {},
    callback = () => {},
    maxFiles = 10,
    disabled = false,
    btnText = 'upload',
    btnProps = {},
    size = 20,
    nameSize = 200,
    hideRemoveBtn = false,
    showUploadList = true,
    filterOptions,
  } = props;
  const imgRef = useRef();
  const [fileList, setFileList] = useState(initialFiles || []);
  const [activeUrl, setActiveUrl] = useState('');

  // 上传前
  const beforeUpload = (file, files) => {
    if (num === 0) {
      callback('before', file, files);
    }

    num ++;

    // 检测文件名长度
    if (file.name.length > nameSize) {
      message.error(`文件名长度(包含后缀)不能超过 ${nameSize}个字符：${file.name}`);
      return Promise.reject();
    }

    // 检测文件大小
    if ((file.size / 1048576) > size) {
      message.error(`文件大小不能超过 ${size}MB：${file.name}`);
      return Promise.reject();
    }

    // 检测上传文件数
    const nowFileLength = files.length + fileList.length;
    if (nowFileLength > maxFiles) {
      message.error(`最多只能上传 ${maxFiles} 个文件`);
      return Promise.reject();
    }

    setFileList((i) => {
      const newFileList = [...i, file];
      if (num >= files.length) {
        num = 0;
        callback('after', file, newFileList);
      }

      return newFileList;
    });

    return false;
  };

  // 删除
  const onRemove = async (file) => {
    const res = await callback('remove', file, fileList) || false;

    if (res === false) {
      removeFile(file);
    } else if (isPromise(res)) {
      res.then(() => {
        removeFile(file);
      })
    }
  };

  // 删除文件
  const removeFile = (file) => {
    setFileList(i => {
      const index = i.indexOf(file);
      const newFileList = i.slice();
      newFileList.splice(index, 1);
      return newFileList;
    })
  };

  const request = (FormData, cb) => {
    fetch(url, {
      headers: {
        pragma: 'no-cache',
        Accept: 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: FormData,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
      })
      .then(response => response.json())
      .then(res => {
        cb(res);
      })
  };

  // 上传操作
  const onUpload = (succ = () => {}, err = () => {}) => {
    const noUploadList = []; // 不需要上传的文件列表
    const formData = new FormData();
    fileList.forEach(i => {
      if (!i.filePath || (i.toString() === '[object File]')) {
        formData.append('files', i);
      } else {
        noUploadList.push(i);
      }
    });

    if (formData.get('files')) {
      // 将额外的入参注入到 formData 中
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });

      request(formData, (res) => {
        const renderFiles = []; // 需要渲染的文件列表数据

        if (res && res.success) {
          // 兼容后端返回的可能是个对象的情况，将其包装成数组返回给回调函数
          const dataObject = Array.isArray(res.dataObject) ? res.dataObject : [res.dataObject];
          renderFiles.push(...[...noUploadList, ...onInitialFiles(dataObject, filterOptions)]);
          succ(renderFiles, dataObject);
        } else {
          renderFiles.push(...noUploadList);
          message.error(res.errorMessage);
          err(res);
        }

        // 如果不需要渲染，则不显示列表数据
        setFileList(showUploadList ? renderFiles : []);
      });
    } else {
      succ(noUploadList);
    }
  };

  // 重置
  const reset = () => {
    setFileList([]);
  };

  // 提供给外部的接口
  useImperativeHandle(ref, () => ({
    reset,
    onUpload,
  }));

  return (
    <div
      className={cx('td-upload-wrap', wrapClassName, {
        'td-upload-hide-remove': hideRemoveBtn,
      })}
    >
      <Upload
        {...props}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        onPreview={isPreview && ((file) => {
          if (file.url) {
            imgRef.current.show();
            setActiveUrl(file.url);
          }
        })}
      >
        <Button {...btnProps} icon="upload" disabled={disabled}>{btnText}</Button>
      </Upload>
      {tip && <div className="td-upload-tip">{tip}</div>}
      <ImgModal ref={imgRef} url={activeUrl} />
    </div>
  );
});

TdUpload.onInitialFiles = onInitialFiles;

export default TdUpload;