import React from 'react';
import './index.less';

export default ({ width = '100%', style = {}, lineClamp,  ...rest }) => {
  const className = `td-ellipsis${lineClamp ? '-line-clamp' : ''}`;

  return (
    <div
      className={className}
      style={{ maxWidth: width, WebkitLineClamp: lineClamp, ...style }}
      {...rest}
    />
  );
}
