import * as React from 'react';
import './index.less';

export default ({ className = '', ...rest }) => (
  <button
    type="button"
    {...rest}
    className={`td_link_btn ${className}`}
  >
    {rest.children}
  </button>
);
