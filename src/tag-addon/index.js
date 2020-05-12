import * as React from 'react';
import Tag from 'antd/es/tag';
import 'antd/es/tag/style';

export default (props) => {
  const {
    children,
    addonAfter,
    addonBefore,
    isBackground = true,
    tagProps = {},
  } = props;

  return (
    <React.Fragment>
      {addonBefore}
      <Tag
        {...tagProps}
        style={{
          marginLeft: addonBefore && 8,
          background: !isBackground && 'none',
        }}
      >
        {children}
      </Tag>
      {addonAfter}
    </React.Fragment>
  );
}