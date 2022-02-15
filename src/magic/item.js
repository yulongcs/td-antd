import React, { useState, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import genNonDuplicateID from '../tools/genNonDuplicateID';
import { _setTimeout } from '../_utils';
import './item.less';

import { MagicContext } from './index';

let transitionFlag = true;

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

  // 生成一个作用于组件 body 部分的唯一 id
  const id = useRef(`td-magic-item-body-${genNonDuplicateID(5)}`).current;
  // 用于存储 body 元素
  const ele = useRef();
  const { boxShadow = true } = useContext(MagicContext);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // 组件渲染后，获取 body 元素
  useEffect(() => {
    ele.current = document.getElementById(id);
    ele.current.addEventListener('transitionend', (e) => {
      // 当前是 body 元素，且可以执行监控回调时
      if (e.target === ele.current && !transitionFlag) {
        transitionFlag = true;
        // 动画结束后，如果 body 的实际高度大于 0，则表示当前是展开状态，则设置为 auto；
        if (ele.current.offsetHeight > 0) {
          ele.current.style.height = '';
        }
      }
    }, false);
  }, []);

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
      <div
        className={classNames('td-magic-item-header', {
          'td-magic-hidden': !(title || extra || isCollapsed),
        })}
      >
        <div className="td-magic-item-header-title">
          {title}
        </div>
        <Space>
          {extra}
          {isCollapsed && (
            <span
              className="td-magic-collapsed"
              onClick={() => {
                if (transitionFlag) {
                  // 准备收起时
                  transitionFlag = false;
                  if (collapsed) {
                    ele.current.style.height = `${ele.current.offsetHeight}px`;
                  }

                  _setTimeout(() => {
                    setCollapsed(!collapsed);
                  });
                }
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
