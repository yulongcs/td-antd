import * as React from 'react';
import cx from 'classnames';
import { Spin } from 'antd';
import redirect from '../redirect';
import './index.less';

export default (props) => {
  const {
    disabled = false,
    loading = false,
    danger = false,
    className,
    to,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type="button"
      disabled={disabled || loading}
      className={cx('td-link-btn', className, {
        'td-link-loading': loading,
        'td-link-danger': danger,
      })}
      onClick={() => {
        if (to) {
          redirect(to, null, rest.target);
        } else {
          rest.onClick && rest.onClick();
        }
      }}
    >
      <Spin size="small" spinning={loading}>{rest.children}</Spin>
    </button>
  );
};
