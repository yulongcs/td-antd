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
      onClick={() => to ? redirect(to, null, rest.blank) : rest.onClick()}
    >
      {loading ? <Spin size="small" /> : props.children}
    </button>
  );
};
