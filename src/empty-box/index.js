import React from 'react';
import { Empty } from 'antd';

export default (props) => {
  const {
    show = true,
    image,
    children,
    ...rest
  } = props;

  const img = image || Empty.PRESENTED_IMAGE_SIMPLE;

  return show ? <Empty {...rest} image={img} /> : children;
}
