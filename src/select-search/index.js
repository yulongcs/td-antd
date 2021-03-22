import React, { useState } from 'react';
import { fetch } from 'dva';
import { Select, Spin } from 'antd';
import useDebounce from '../tools/useDebounce';

export default (props) => {
  const {
    url,
    isData,
    fields,
    afterFetch,
    customOption,
    onChange = () => {},
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(props.value);
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
    setValue(v);
    onChange(v);
  };

  return (
    <Select
      value={value}
      showSearch
      notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
      filterOption={false}
      onSearch={onFetch}
      onChange={handleChange}
      onBlur={() => { setData([]) }}
      style={{ width: 200 }}
      {...rest}
    >
      {data.map(item => (
        <Select.Option
          key={isData ? JSON.stringify(item) : item[fields[0]]}
        >
          {(customOption && customOption(item)) || item[fields[1]]}
        </Select.Option>
      ))}
    </Select>
  );
}
