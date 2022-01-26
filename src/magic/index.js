import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { Spin, Space } from 'antd';
import Item from './item';
import './index.less';

export const MagicContext = React.createContext({});

// 最外层组件
const Magic = (props) => {
  const {
    wrapperClassName,
    footerClassName,
    footer = false,
    loading = false,
    boxShadow = true,
    onCollapsed,
    ...rest
  } = props;

  const getItems = React.Children.map(rest.children, ((child, index) => {
    if (child) {

      if (child.type && child.type.__TD_ANTD_MAGIC_ITEM) {
        return cloneElement(child, {
          itemKey: child.props.itemKey || index,
          onCollapsed: child.props.onCollapsed || onCollapsed,
        });
      }

      return cloneElement(child);
    }

    return null;
  }));

  return (
    <MagicContext.Provider
      value={{
        boxShadow,
        onCollapsed,
      }}
    >
      <Spin
        wrapperClassName={classNames(wrapperClassName, {
          'td-magic-wrap-padding-bottom': footer,
        })}
        style={{ paddingBottom: footer ? 64 : 0}}
        spinning={loading}
        {...rest}
      >
        {getItems}
      </Spin>
      {footer && <Space className={classNames('td-magic-footer', footerClassName)}>{footer}</Space>}
    </MagicContext.Provider>
  );
};

Magic.Item = Item;

export default Magic;
