import React from 'react';
import cx from 'classnames';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Upload, Button, message } from 'antd';
import ImgModal from './img-modal';
import onInitialFiles from './onInitialFiles';
import typeOf from '../tools/typeOf';
import ACCEPT from './accept';
import localConfig from '../local-config';
import _isEqual from 'lodash/isEqual';
import './index.less';

let num = 0; // 上传文件计数
let waitFiles = []; // 等待插入组件的数据
const TEXT_PICTURE_CARD = 'picture-card';
const TEXT_FIXED_CARD = 'fixed-card';
const ERROR_0 = '图片尺寸不符合要求，请修改后重新上传！';
const ERROR_1 = '组件 scale 参数格式错误';
const ERROR_2 = '文件类型不符合要求，请修改后重新上传！';
const ERROR_3 = '图片加载错误';

class TdUpload extends React.PureComponent {
  static defaultProps = {
    url: '/file/upload.json',
    name: 'files',
    isPreview: false,
    btnText: '上传',
    params: {}, // 除 files 外的入参
    callback: () => {},
    maxFiles: 10,
    btnProps: {},
    size: 20,
    nameSize: 200,
    hideRemoveBtn: false, // 是否可以删除，true 的时候会展示删除按钮
    showUploadList: true, // 是否展示文件列表，原API
    scale: false, // 校验图片尺寸
    initial: [], // 初始化文件列表数据
    show: true, // 是否显示
    showDownLoad: true, // 是否保留下载入口
    beforeDownload: () => {}, // 下载控制
    fileTypes: [],
  };

  state = {
    fileList: onInitialFiles(this.props.initial, this.props.filterOptions),
    previewImg: '',
    loading: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.initial && nextProps.initial) {
      if (!_isEqual(this.props.initial, nextProps.initial)) {
        this.setState({
          fileList: onInitialFiles(nextProps.initial, this.props.filterOptions),
        })
      }
    }
  }

  // 异步上传文件
  onUpload = () => {
    const _this = this;
    const { params, showUploadList, filterOptions, name, url } = this.props;
    const noUploadList = []; // 不需要上传的文件列表
    const formData = new FormData();
    // 当前有文件需要上传时，过滤出需要上传的文件进行上传
    _this.state.fileList.forEach((file) => {
      if (file.toString() === '[object File]') {
        formData.append(name, file);
      } else {
        noUploadList.push(file);
      }
    });

    return new Promise(async (resolve, reject) => {
      if (formData.get(name)) {
        const { request } = localConfig.newInstance(); // 获取实例

        // 将额外的入参注入到 formData 中
        Object.keys(params).forEach(key => {
          formData.append(key, params[key]);
        });

        this.setState({ loading: true });
        const res = await request({
          url,
          method: 'POST',
          body: formData,
        }).finally(() => {
          this.setState({ loading: false });
        });

        const renderFiles = []; // 需要渲染的文件列表数据
        if (res && res.success) {
          // 兼容后端返回的可能是个对象的情况，将其包装成数组返回给回调函数
          const dataObject = Array.isArray(res.dataObject) ? res.dataObject : [res.dataObject];
          renderFiles.push(...[...noUploadList, ...onInitialFiles(dataObject, filterOptions)]);
          resolve([renderFiles, dataObject]);
        } else {
          renderFiles.push(...noUploadList);
          message.error(res.errorMessage);
          reject(res);
        }

        // 如果不需要渲染，则不显示列表数据
        _this.setState({ fileList: showUploadList ? renderFiles : [] });
      } else {
        resolve([noUploadList, _this.state.fileList]);
      }
    });
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

    if (typeOf(res, 'Promise')) {
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
    this.setState(({ fileList = [] }) => ({fileList: fileList.filter(item => item.uid !== file.uid)}));
  };

  beforeUpload = async (file, files) => {
    const { maxFiles, callback, size, nameSize, scale } = this.props; // 最大上传文件数


    const { fileList } = this.state;
    const nowFileLength = files.length + fileList.length;
    let check = true; // 当前文件是否校验通过，默认通过
    if (num === 0) {
      await callback('before', file, files, this.onUpload);
    }

    // 上传文件的类型存在时，文件类型校验
    if (file.type) {
      const replaceText = file.type.substring(file.type.lastIndexOf('/'), file.type.length);
      const accept = file.type.replace(replaceText, '/*');
      const accepts = this.getAcceptString();

      if (accepts && !accepts.includes(accept)) {
        message.error(ERROR_2);
        check = false;
      }
    }

    // 额外的校验，返回真值后，停止上传
    if (await callback('validate', file, files, this.onUpload)) {
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
      return this._scaleVerification(check, file, files);
    }

    if (check) {
      return this._getBase64(file, files);
    }
    this.setStateFile(files);
    return false;
  };

  // 获取文件类型集合
  getAcceptString = () => {
    const { fileTypes, accept } = this.props; // 最大上传文件数

    if (fileTypes.length > 0) {
      return `${ACCEPT.toString(fileTypes)}${!!accept ? `,${accept}` : ''}`;
    }

    return accept;
  };

  // 将可用文件存入 state 中
  setStateFile = (files) => {
    const { listType } = this.props;

    num ++;
    // 判断当前是否为最后一次文件解析
    if (num >= files.length) {
      this.setState(state => {
        if (listType === TEXT_FIXED_CARD) {
          // 当类型是单张图片时，进行
          return { fileList: waitFiles };
        }

        return { fileList: [...state.fileList, ...waitFiles] }
      }, () => {
        const { callback } = this.props;
        waitFiles = []; // 重置待上传文件列表
        num = 0; // 重置计数
        callback('after', null, this.state.fileList, this.onUpload);
      });
    }
  };

  // 判断类型是否为 picture-card，如果是，则进行 base64 转化，并写入数据
  _getBase64 = (file, files) => {
    const { listType } = this.props;

    return new Promise((resolve) => {
      if ([TEXT_PICTURE_CARD, TEXT_FIXED_CARD].includes(listType)) {
        this._onLoadFile(file, (base64) => {
          file.url = base64;
          resolve(file);
        });
      } else {
        resolve(file);
      }
    }).then((resFile) => {
      waitFiles.push(resFile);
      this.setStateFile(files);
    })
  };

  // 图片尺寸校验
  _scaleVerification = (check, file, files) => {
    const { scale } = this.props;
    return new Promise((resolve, reject) => {
      // 前置校验不通过的话，直接 reject
      if (!check) {
        reject();
      } else {
        // 校验文件宽度
        this._onLoadFile(file, (base64) => {
          const image = new Image();
          image.src = base64;
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
                resolve(base64);
              } else {
                message.error(`${file.name}：${ERROR_0}`);
                reject();
              }
            } else if (Array.isArray(scale)) { // 如果是数组的话
              if ((scale[0] && image.width !== scale[0]) || (scale[1] && image.height !== scale[1])) {
                message.error(`${file.name}：${ERROR_0}`);
                reject();
              } else {
                resolve(base64);
              }
            }
          };
        });
      }
    }).then((base64) => {
      file.url = base64;
      waitFiles.push(file);
      this.setStateFile(files)
    }, () => {
      this.setStateFile(files)
    })
  };

  // 预读文件，获取文件的 base64 码
  _onLoadFile = (file, cb = () => {}) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ({ target }) => {
      cb(target.result);
    }
  };

  // 子内容的渲染
  renderUploadChildren = () => {
    const { loading, fileList } = this.state;
    const {
      btnText, btnProps, listType, extra, fixedStyles, fixedBgImg, children,
    } = this.props;

    if (listType) {
      if (listType === TEXT_PICTURE_CARD) {
        return <PlusOutlined />;
      }

      if (listType === TEXT_FIXED_CARD) {
        return (
          <div style={fixedStyles} className="td-upload-fixed">
            {
              (!fixedBgImg && fileList.length === 0)
              ? <PlusOutlined />
              : <img src={fileList.length > 0 ? fileList[0].url : fixedBgImg} alt={ERROR_3} className="td-upload-fixed-img" />
            }
          </div>
        )
      }
    }

    return (
      <React.Fragment>
        {children || <Button loading={loading} {...btnProps}>{btnText}</Button>}
        {extra}
      </React.Fragment>
    )
  };

  render() {
    const { previewImg, loading } = this.state;
    const {
      tip, isPreview, wrapClassName, hideRemoveBtn, hidden, show, listType, showDownLoad, beforeDownload,
    } = this.props;

    if (show) {
      return (
        <div
          className={cx('td-upload-wrap', wrapClassName, {
            'td-upload-hide-remove': hideRemoveBtn,
            'td-upload-hide': hidden,
            'td-upload-fixed-card': listType === TEXT_FIXED_CARD, // 如果是图片固定位模式，则不显示列表
          })}
        >
          <Upload
            {...this.props}
            disabled={loading}
            accept={this.getAcceptString()}
            fileList={this.state.fileList}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            customRequest={() => {}}
            onPreview={isPreview && ((file) => {
              if (file.url) {
                this.setState({
                  previewImg: file.url,
                }, () => {
                  this.imgRef.show();
                });
              }
            })}
          >
            {this.renderUploadChildren()}
          </Upload>
          {tip && <div className="td-upload-tip">{tip}</div>}
          <ImgModal ref={r => {this.imgRef = r}} url={previewImg} beforeDownload={beforeDownload} showDownLoad={showDownLoad} />
        </div>
      );
    }

    return null;
  }
}

TdUpload.Preview = (props) => {
  const {
    initial = [],
    ...rest
  } = props;

  return (
    <TdUpload
      hidden
      isPreview
      hideRemoveBtn
      initial={initial}
      wrapClassName="td-upload-preview"
      {...rest}
    />
  );
};

export default TdUpload;
