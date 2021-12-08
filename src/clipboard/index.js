import React, { useState } from 'react';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { Tooltip } from 'antd';
import delay from '../tools/delay';
import clipboard from '../tools/clipboard';
import './index.less';

const TIP = '点击复制';
const TIP2 = '已复制';

const Clipboard = ({ text = '', disabled = false, ...rest }) => {
  const [tip, setTip] = useState(TIP);

  if (disabled) {
    return <CopyOutlined className="td-clipboard-disabled" />
  }

  return (
    <Tooltip
      title={tip}
      onVisibleChange={(visible) => {
        if (!visible) {
          delay(() => {
            setTip(TIP);
          }, 200);
        }
      }}
    >
      <CopyOutlined
        {...rest}
        className="td-clipboard"
        onClick={() => {
          clipboard(text).then(() => {
            setTip(TIP2);
          })
        }}
      />
    </Tooltip>
  );
};

export default Clipboard;
