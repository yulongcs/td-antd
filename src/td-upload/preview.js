/*
* 约定：fileList 和 RdUpload 的 initialFiles 的格式相同
* API: {
*  fileList: [],
*  isHandle: false, // hover时是否展示操作区
*  onRemove: 删除事件
* }
* */

import React from 'react';
import { Icon } from 'antd';
import ImgModal from './img-modal';
import './index.less';

export default class Preview extends React.PureComponent {
  static defaultProps = {
    fileList: [],
    isHandle: false,
    onRemove: () => {},
  };

  state = {
    previewImg: '',
  };

  renderFileList = () => {
    const { fileList, isHandle, onRemove } = this.props;

    return fileList.map((item, index) => (
      <React.Fragment>
        <span className="td-preview-item">
          <a onClick={() => this.showModal(item)}>{item.name}</a>
          {isHandle && (
            <span className="td-preview-item-btn">
              <Icon type="delete" title="删除" onClick={() => onRemove(item)} />
            </span>
          )}
        </span>
        {fileList.length > (index + 1) && '、'}
      </React.Fragment>
    ))
  };

  showModal = (record) => {
    this.imgRef.show();
    this.setState({
      previewImg: record.url,
    });
  };

  render() {
    const { previewImg } = this.state;

    return (
      <React.Fragment>
        {this.renderFileList()}
        <ImgModal ref={r => {this.imgRef = r}} url={previewImg} />
      </React.Fragment>
    );
  }
}
