import * as React from 'react';
import classNames from 'classnames';
import './index.less';

export default ({ className, ...rest }) => (
  <button
    type="button"
    {...rest}
    className={classNames('td_link_btn', className)}
  >
    {rest.children}
  </button>
);
