import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import './item.less';

import { MagicContext } from './index';

// 模块组件
const Item = ({
  title,
  footer,
  extra,
  children,
  titleExtra,
  onCollapsed,
  loading = false,
  isCollapsed = false,
  footerVisible = true,
  defaultCollapsed = true,
  wrapperClassName,
  ...rest
}) => {

  const { boxShadow = true } = useContext(MagicContext);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    onCollapsed && onCollapsed(collapsed, rest.itemKey);
  }, [collapsed]);

  useEffect(() => {
    setCollapsed(defaultCollapsed);
  }, [defaultCollapsed]);

  return (
    <Spin
      wrapperClassName={classNames(wrapperClassName, 'td-magic-item-wrap', {
        'td-magic-item-box-shadow': rest.boxShadow ?? boxShadow,
      })}
      spinning={loading}
      {...rest}
    >
      {(title || extra || isCollapsed || titleExtra) && (
        <div className="td-magic-item-header">
          <Space>
            {title && <span className="td-magic-item-header-title">{title}</span>}{titleExtra}
          </Space>
          <Space>
            {extra}
            {isCollapsed && <span className="td-magic-collapsed" onClick={() => {setCollapsed(!collapsed)}}>{collapsed ? '收起' : '展开'}</span>}
          </Space>
        </div>
      )}
      {collapsed && (
        <div className="td-magic-item-content">
          {children}
        </div>
      )}
      {footerVisible && collapsed && <Space className="td-magic-item-footer">{footer}</Space>}
    </Spin>
  );
};

Item.__TD_ANTD_MAGIC_ITEM = true;

export default Item;
