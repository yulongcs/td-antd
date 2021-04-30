import React, { useState, useEffect } from 'react';
import { Descriptions, Spin } from 'antd';
import { typeOf } from '../_util';
import localConfig from '../local-config';

// 进行字段的深度识别
const deepGet = (object, path = '') => {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    .reduce((o, k) => (o || {})[k], object);
};

// 渲染值
const renderValue = ({ dataIndex, nowData, render, defaultValue }) => {
  // 当 column 中有 dataIndex 时，就可以获取到数据
  const text = deepGet(nowData, dataIndex);

  // 当有 render 函数，且有下标字段时，可查询出值是否存在
  if (render && dataIndex) {
    return text ? render(text, nowData) : defaultValue;
  }

  // 当只有 render 函数时，直接渲染
  if (render) {
    return render(nowData) ?? defaultValue;
  }

  return text ?? defaultValue;
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
        visible = true,
        span = 1,
        ...columnsRest
      } = item;

      if (typeOf(visible, 'Function') ? visible(nowData) : visible) {
        return (
          <Descriptions.Item label={title} key={index} span={span} {...columnsRest}>
            {renderValue({ ...item, defaultValue, nowData })}
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
