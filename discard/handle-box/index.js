import React from 'react';
import './index.less';

export default ({ children, className = '', ...rest }) => (
  <div {...rest} className={`td-handle-box ${className}`}>{children}</div>
);
