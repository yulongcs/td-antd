import React from 'react';
import { Select } from 'antd';

export default ({ data, fields = [], ...rest}) => {
  const renderOption = () => {
    if (data) {
      if (Array.isArray(data)) {
        if (data[0] && typeof data[0] === 'object') {
          return data.map(item => (
            <Select.Option
              key={item[fields[0]]}
              {...item}
            >{item[fields[1]]}
            </Select.Option>
          ));
        }
        return data.map(item => <Select.Option key={item}>{item}</Select.Option>);
      }

      return Object.keys(data).map(item => <Select.Option key={item}>{data[item]}</Select.Option>);
    }

    return null;
  };

  return (
    <Select
      showSearch
      allowClear
      filterOption={(inputValue, option) => (option.props.children.includes(inputValue))}
      placeholder="请选择"
      {...rest}
    >
      {renderOption()}
    </Select>
  );
}
