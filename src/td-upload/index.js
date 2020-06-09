import React from 'react';
import { fetch } from 'dva';
import cx from 'classnames';
import { Upload, Button, message } from 'antd';
import ImgModal from './img-modal';
import Preview from './preview';
import onInitialFiles from './onInitialFiles';
import isPromise from '../tools/isPromise';
import localConfig from '../local-config';
import './index.less';

let num = 0; // 上传文件计数

class TdUpload extends React.PureComponent {
  static defaultProps = {
    url: '/file/upload.json',
    isPreview: false,
    btnText: '上传',
    params: {}, // 除 files 外的入参
    callback: () => {},
    maxFiles: 10,
    disabled: false,
    btnProps: {},
    size: 20,
    nameSize: 200,
    hideRemoveBtn: false, // 是否可以删除，true 的时候会展示删除按钮
    showUploadList: true, // 是否展示文件列表，原API
  };

  state = {
    fileList: this.props.initialFiles || [],
    previewImg: '',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.initialFiles && nextProps.initialFiles) {
      if (this.props.initialFiles.toString() !== nextProps.initialFiles.toString()) {
        this.setState({
          fileList: nextProps.initialFiles,
        })
      }
    }
  }

  request = (FormData, cb) => {
    const { url } = this.props;
    const newInstance = localConfig.newInstance();
    fetch(`${newInstance.proxy}${url}`, {
      headers: {
        pragma: 'no-cache',
        Accept: 'application/json',
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

  // 异步上传文件
  onUpload = async (succ = () => {}, err = () => {}) => {
    const { params, showUploadList, filterOptions } = this.props;
    const noUploadList = []; // 不需要上传的文件列表
    const formData = new FormData();
    // 当前有文件需要上传时，过滤出需要上传的文件进行上传
    this.state.fileList.forEach((file) => {
      if (!file.filePath || (file.toString() === '[object File]')) {
        formData.append('files', file);
      } else {
        noUploadList.push(file);
      }
    });

    if (formData.get('files')) {
      // 将额外的入参注入到 formData 中
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });

      this.request(formData, (res) => {
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
        this.setState({ fileList: showUploadList ? renderFiles : [] });
      });
    } else {
      succ(noUploadList);
    }
  };

  // 重置列表
  reset = () => {
    this.setState({
      fileList: [],
    });
  };

  onRemove = async (file) => {
    const { callback } = this.props;
    const res = await callback('remove', file);

    if (isPromise(res)) {
      res.then((bool) => {
        if (bool !== false) {
          this.removeFile(file);
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    if (res !== false) {
      this.removeFile(file);
    }
  };

  // 删除文件
  removeFile = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  };

  beforeUpload = (file, files) => {
    const { maxFiles, callback, size, nameSize } = this.props; // 最大上传文件数
    const { fileList } = this.state;
    const nowFileLength = files.length + fileList.length;
    if (num === 0) {
      callback('before');
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

    // 检测单次上传文件数
    if (nowFileLength > maxFiles) {
      message.error(`最多只能上传 ${maxFiles} 个文件`);
      return Promise.reject();
    }

    this.setState(state => ({
      fileList: [...state.fileList, file],
    }), () => {
      if (num >= files.length) {
        num = 0;
        callback('after', file, this.state.fileList);
      }
    });
    return false;
  };

  render() {
    const { previewImg } = this.state;
    const { btnText, disabled, btnProps, tip, isPreview, wrapClassName, hideRemoveBtn } = this.props;

    return (
      <div
        className={cx('td-upload-wrap', wrapClassName, {
          'td-upload-hide-remove': hideRemoveBtn,
        })}
      >
        <Upload
          {...this.props}
          fileList={this.state.fileList}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          onPreview={isPreview && ((file) => {
            if (file.url) {
              this.imgRef.show();
              this.setState({
                previewImg: file.url,
              });
            }
          })}
        >
          <Button {...btnProps} icon="upload" disabled={disabled}>{btnText}</Button>
        </Upload>
        {tip && <div className="td-upload-tip">{tip}</div>}
        <ImgModal ref={r => {this.imgRef = r}} url={previewImg} />
      </div>
    );
  }
}

TdUpload.Preview = Preview;
TdUpload.onInitialFiles = onInitialFiles;

export default TdUpload;