import * as React from 'react';
import Select from 'antd/es/select';
import 'antd/es/select/style';

export default (props) => {
  const {
    data,
    fields = [],
  } = props;

  const renderOption = () => {
    if (data) {
      if (Array.isArray(data)) {
        if (data[0] && typeof data[0] === 'object') {
          return data.map(item => <Select.Option key={item[fields[0]]}>{item[fields[1]]}</Select.Option>);
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
      style={{ width: '100%' }}
      filterOption={(inputValue, option) => (option.props.children.includes(inputValue))}
      {...props}
    >
      {renderOption()}
    </Select>
  );
}
