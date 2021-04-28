import React from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import Item from './item';
import './index.less';

export const MagicContext = React.createContext({});

// 最外层组件
const Magic = (props) => {
  const {
    footer,
    footerVisible = true,
    footerStyle,
    children,
    loading = false,
    left = 200,
    boxShadow = true,
    ...rest
  } = props;

  return (
    <MagicContext.Provider
      value={{
        boxShadow,
      }}
    >
      <Spin
        wrapperClassName={classNames('td-magic-wrap', {
          'td-magic-wrap-padding-bottom': footerVisible && footer,
        })}
        style={{ paddingBottom: footer ? 64 : 0}}
        spinning={loading}
        {...rest}
      >
        {children}
        {footerVisible && <Space className="td-magic-footer" style={{ left, ...footerStyle }}>{footer}</Space>}
      </Spin>
    </MagicContext.Provider>
  );
};

Magic.Item = Item;

export default Magic;
