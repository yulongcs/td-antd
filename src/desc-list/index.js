import * as React from 'react';
import { Descriptions } from 'antd';

export default (props) => {
  const {
    dataSource = {},
    columns = [],
    defaultValue = '--',
  } = props;

  const deepGet = (object, path) => {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
      .reduce((o, k) => (o || {})[k], object) || defaultValue;
  };

  const renderValue = (value) => {
    if (React.isValidElement(value)) {
      return value;
    } else {
      if (value && value !== null && value !== '') {
        return value;
      }

      return defaultValue;
    }
  };

  const renderItem = () => {
    return columns.map((item, index) => {
      const {
        title,
        dataIndex = '',
        render,
        visible = true,
        span = 1,
      } = item;

      if ((typeof visible === 'boolean' && visible) || (typeof visible === 'function' && visible(item))) {
        const value = render ? render(dataSource) : deepGet(dataSource, dataIndex);

        return (
          // eslint-disable-next-line
          <Descriptions.Item label={title} key={index} span={span}>
            {renderValue(value)}
          </Descriptions.Item>
        )
      }

      return null;
    })
  };

  return (
    <Descriptions {...props}>
      {renderItem()}
    </Descriptions>
  );
}
