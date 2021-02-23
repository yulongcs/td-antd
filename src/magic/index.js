import React, { useState } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import './index.less';

// 最外层组件
const Magic = ({ footer, footerVisible = true, children, loading = false, left = 200, ...rest }) => {
  return (
    <Spin
      wrapperClassName={classNames('td-magic-wrap', {
        'td-magic-wrap-padding-bottom': footerVisible && footer,
      })}
      style={{ paddingBottom: footer ? 64 : 0}}
      spinning={loading}
      {...rest}
    >
      {children}
      {footerVisible && <Space className="td-magic-footer" style={{ left }}>{footer}</Space>}
    </Spin>
  );
};

// 模块组件
const Item = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    title,
    footer,
    children,
    loading = false,
    isCollapsed = false,
    footerVisible = true,
    ...rest
  } = props;

  return (
    <Spin
      wrapperClassName="td-magic-item-wrap"
      spinning={loading}
      {...rest}
    >
      <div className="td-magic-item-header">
        <div className="td-magic-item-header-left">
          {title}
        </div>
        <div className="td-magic-item-title-right">
          {isCollapsed && <a onClick={() => {setCollapsed(!collapsed)}}>{collapsed ? '收起' : '展开'}</a>}
        </div>
      </div>
      {collapsed && (
        <div className="td-magic-item-content">
          {children}
        </div>
      )}
      {footerVisible && collapsed && <Space className="td-magic-item-footer">{footer}</Space>}
    </Spin>
  );
};

Magic.Item = Item;

export default Magic;
