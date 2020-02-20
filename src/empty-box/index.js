import React from 'react';
import { Empty } from 'antd';

export default (props) => {
  const { show = true, children = null, emptyProps = {} } = props;

  return show ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} {...emptyProps} /> : children;
}
