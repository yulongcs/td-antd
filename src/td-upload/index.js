import React from 'react';
import { fetch } from 'dva';
import cx from 'classnames';
import { Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgModal from './img-modal';
import onInitialFiles from './onInitialFiles';
import isPromise from '../tools/isPromise';
import localConfig from '../local-config';
import './index.less';

let num = 0; // 上传文件计数
let waitFiles = []; // 等待插入组件的数据
const ERROR_0 = '图片尺寸不符合要求，请修改后重新上传！';
const ERROR_1 = '组件 scale 参数格式错误';

class TdUpload extends React.PureComponent {
  static defaultProps = {
    url: '/file/upload.json',
    name: 'files',
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
    scale: false, // 校验图片尺寸
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
    fetch(`${newInstance.proxy || ''}${url}`, {
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
  onUpload = (succ = () => {}, err = () => {}) => {
    const { params, showUploadList, filterOptions, name } = this.props;
    const noUploadList = []; // 不需要上传的文件列表
    const formData = new FormData();
    // 当前有文件需要上传时，过滤出需要上传的文件进行上传
    this.state.fileList.forEach((file) => {
      if (!file.filePath || (file.toString() === '[object File]')) {
        formData.append(name, file);
      } else {
        noUploadList.push(file);
      }
    });

    if (formData.get(name)) {
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
    const { maxFiles, callback, size, nameSize, scale } = this.props; // 最大上传文件数
    const { fileList } = this.state;
    const nowFileLength = files.length + fileList.length;
    let check = true; // 当前文件是否校验通过，默认通过
    if (num === 0) {
      callback('before', file, files);
    }

    num ++;

    // 额外的校验，返回真值后，停止上传
    if (callback('validate', file, files)) {
      check = false;
    }

    // 检测文件名长度
    if (file.name.length > nameSize) {
      message.error(`${file.name}：文件名长度(包含后缀)不能超过 ${nameSize}个字符`);
      check = false;
    }

    // 检测文件大小
    if ((file.size / 1048576) > size) {
      message.error(`${file.name}：文件大小不能超过 ${size}MB`);
      check = false;
    }

    // 检测单次上传文件数
    if (nowFileLength > maxFiles) {
      message.error(`最多只能上传 ${maxFiles} 个文件`);
      check = false;
    }

    // 校验图片尺寸
    if (scale && file.type.includes('image/')) {
      return new Promise((resolve, reject) => {
        // 前置校验不通过的话，直接 reject
        if (!check) {
          reject();
        } else {
          // 校验文件宽度
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (theFile) => {
            const image = new Image();
            image.src = theFile.target.result;
            image.onload = () => {
              // 判断scale是否为字符串，格式是否为 "16:9" 的宽高比
              if (typeof scale === 'string') {
                const scaleArray = scale.split(':');
                const isError = scaleArray.some(i => isNaN(+i));
                if (isError) {
                  message.error(ERROR_1);
                  reject();
                }
                if (+scaleArray[0] * image.height === +scaleArray[1] * image.width) {
                  resolve();
                } else {
                  message.error(`${file.name}：${ERROR_0}`);
                  reject();
                }
              } else if (Array.isArray(scale)) { // 如果是数组的话
                if ((scale[0] && image.width !== scale[0]) || (scale[1] && image.height !== scale[1])) {
                  message.error(`${file.name}：${ERROR_0}`);
                  reject();
                } else {
                  resolve();
                }
              }
            };
          };
        }
      }).then(() => {
        waitFiles.push(file);
        this.setStateFile(files, callback)
      }, () => {
        this.setStateFile(files, callback)
      })
    }

    if (check) {
      waitFiles.push(file);
      this.setStateFile(files, callback);
      return false;
    } else {
      this.setStateFile(files, callback);
      return Promise.reject();
    }
  };

  // 将可用文件存入 state 中
  setStateFile = (files, callback) => {
    // 判断当前是否为最后一次文件解析
    if (num >= files.length) {
      this.setState(state => ({
        fileList: [...state.fileList, ...waitFiles],
      }), () => {
        waitFiles = []; // 重置待上传文件列表
        num = 0; // 重置计数
        callback('after', null, this.state.fileList);
      });
    }
  };

  render() {
    const { previewImg } = this.state;
    const { btnText, disabled, btnProps, tip, isPreview, wrapClassName, hideRemoveBtn, listType, extra } = this.props;

    return (
      <div
        className={cx('td-upload-wrap', wrapClassName, {
          'td-upload-hide-remove': hideRemoveBtn,
          'td-upload-hide': disabled,
        })}
      >
        <Upload
          {...this.props}
          fileList={this.state.fileList}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          customRequest={() => {}}
          onPreview={isPreview && ((file) => {
            if (file.url) {
              this.imgRef.show();
              this.setState({
                previewImg: file.url,
              });
            }
          })}
        >
          {(listType && listType === 'picture-card') ? (
            <PlusOutlined className="" />
          ) : (
            <React.Fragment>
              <Button {...btnProps}>{btnText}</Button>
              {extra}
            </React.Fragment>
          )}
        </Upload>
        {tip && <div className="td-upload-tip">{tip}</div>}
        <ImgModal ref={r => {this.imgRef = r}} url={previewImg} />
      </div>
    );
  }
}

TdUpload.onInitialFiles = onInitialFiles;

export default TdUpload;
