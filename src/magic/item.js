import React, { useState, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import genNonDuplicateID from '../tools/genNonDuplicateID';
import { _setTimeout } from '../_utils';
import './item.less';

import { MagicContext } from './index';

// 模块组件
const Item = ({
  title,
  footer,
  extra,
  children,
  onCollapsed,
  loading = false,
  isCollapsed = false,
  defaultCollapsed = true,
  footerClassName,
  wrapperClassName,
  ...rest
}) => {

  const id = useRef(`td-magic-item-body-${genNonDuplicateID(5)}`).current;
  const { boxShadow = true } = useContext(MagicContext);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // 执行回调函数
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
      <div className="td-magic-item-header">
        <Space className={classNames('td-magic-item-header-title', { 'td-magic-item-hidden': !title })}>
          {title}
        </Space>
        <Space>
          {extra}
          {isCollapsed && (
            <span
              className="td-magic-collapsed"
              onClick={() => {
                if (collapsed) {
                  // 准备收起时
                  const bodyElement = document.getElementById(id);
                  bodyElement.style = `height:${bodyElement.offsetHeight}px;`;
                }

                _setTimeout(() => {
                  setCollapsed(!collapsed);
                });
              }}
            >{collapsed ? '收起' : '展开'}
            </span>
          )}
        </Space>
      </div>
      <div id={id} className={classNames('td-magic-item-body', { 'td-magic-item-body-hidden': !collapsed })}>
        <div className="td-magic-item-content">{children}</div>
        <Space className={classNames('td-magic-item-footer', footerClassName, { 'td-magic-item-hidden': !footer })}>{footer}</Space>
      </div>
    </Spin>
  );
};

Item.__TD_ANTD_MAGIC_ITEM = true;

export default Item;
