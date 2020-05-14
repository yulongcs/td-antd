import React from 'react';
import { Empty } from 'antd';
import insideImg from './1.svg';

export default (props) => {
  const {
    show = true,
    inside = false,
    description,
    imageStyle,
    image,
  } = props;

  const img = image || (inside ? <img src={insideImg} alt="no-data" /> : Empty.PRESENTED_IMAGE_SIMPLE);

  if (show) {
    return (
      <Empty
        image={img}
        imageStyle={imageStyle}
        description={description}
      />
    );
  }

  return props.children;
}
