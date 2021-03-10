import React, { useState, useEffect } from 'react';
import { Descriptions, Spin } from 'antd';
import localConfig from '../local-config';

// 进行字段的深度识别
const deepGet = (object, path, defaultValue) => {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    .reduce((o, k) => (o || {})[k], object) || defaultValue;
};

// 渲染列的值
const renderValue = (value, defaultValue) => {
  if (React.isValidElement(value)) {
    return value;
  } else {
    if (value && value !== null && value !== '') {
      return value;
    }

    return defaultValue;
  }
};

export default (props) => {
  const {
    url,
    dataSource = {},
    columns = [],
    defaultValue = '--',
    callback = () => {},
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    // eslint-disable-next-line
    url && url.trim() !== '' && query();
  }, [url]);

  // 获取详情
  const query = () => {
    const { request } = localConfig.newInstance();

    if (request) {
      setLoading(true);
      request({
        url,
        onSuccess: ({ dataObject }) => {
          callback(dataObject);
          setData(dataObject);
        },
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const renderItem = () => {
    const nowData = data || dataSource;

    return columns.map((item, index) => {
      const {
        title,
        dataIndex = '',
        render,
        visible = true,
        span = 1,
      } = item;

      if ((typeof visible === 'boolean' && visible) || (typeof visible === 'function' && visible(nowData))) {
        const text = deepGet(nowData, dataIndex, defaultValue);
        const value = render ? render(nowData, text) : text;

        return (
          // eslint-disable-next-line
          <Descriptions.Item label={title} key={index} span={span}>
            {renderValue(value, defaultValue)}
          </Descriptions.Item>
        )
      }

      return null;
    })
  };

  return (
    <Spin spinning={loading}>
      <Descriptions {...rest}>
        {renderItem()}
      </Descriptions>
    </Spin>
  );
}
