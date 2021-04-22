import React, { useState } from 'react';
import { fetch } from 'dva';
import { Select, Spin } from 'antd';
import useDebounce from '../tools/useDebounce';

let active = []; // 缓存选中的数据

export default (props) => {
  const {
    url,
    fields,
    afterFetch,
    customOption,
    onChange = () => {},
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onFetch = useDebounce((v) => {
    // 有值的情况下才会发送请求
    if (v && v.trim() !== '') {
      setLoading(true);
      fetch(`${url}${v}`)
        .then(response => response.json())
        .then(d => {
          const res = (afterFetch && afterFetch(d)) || [];
          setData(res);
        }).finally(() => {
        setLoading(false);
      })
    }
  });

  const handleChange = (v) => {
    const key = fields[0];
    const value = v || [];
    const arr = data.filter(item => value.includes(item[key])); // 获取当前请求数据中选中的数据
    const filterArr = []; // 记录已过滤数据的 key
    active = [...active, ...arr].reduce((previousValue, currentValue) => { // 将历史选中数据和当前选中数据进行合并，再进行过滤
      // 当前过滤的数据不在 filterArr 中，且过滤的数据在 onChange 的选中项中，则筛选出来
      if (!filterArr.includes(currentValue[key]) && value.includes(currentValue[key])) {
        filterArr.push(currentValue[key]);
        return [...previousValue, currentValue];
      }

      return previousValue;
    }, []);

    onChange(v, active);
  };

  return (
    <Select
      showSearch
      notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
      filterOption={false}
      onSearch={onFetch}
      onChange={handleChange}
      style={{ width: 200 }}
      {...rest}
    >
      {data.map(item => (
        <Select.Option
          key={item[fields[0]]}
        >
          {(customOption && customOption(item)) || item[fields[1]]}
        </Select.Option>
      ))}
    </Select>
  );
}
