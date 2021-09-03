import React, { useState } from 'react';
import './index.less';

export default (props) => {
  const {
    width = '100%',
    style = {},
    lineClamp,
    defaultEllipsis = true,
    ...rest
  } = props;

  const [ellipsis, setEllipsis] = useState(defaultEllipsis); // 是否进行省略

  const className = ellipsis ? `td-ellipsis${lineClamp ? '-line-clamp' : ''}` : '';

  // 双击事件
  const onDoubleClick = () => setEllipsis(!ellipsis);

  return (
    <div
      className={className}
      onDoubleClick={onDoubleClick}
      style={{ maxWidth: width, WebkitLineClamp: lineClamp, ...style }}
      {...rest}
    />
  );
}
