import React from 'react';
import { Select } from 'antd';

const typeOf = (obj) => Object.prototype.toString.call(obj);
const TYPE_MEUM = {
  object: '[object Object]',
  array: '[object Array]',
  string: '[object String]',
};

export default ({ data, fields = [], filterOptionChildren, ...rest}) => {
  const renderOption = () => {
    // 如果是普通对象，则直接进行进行渲染
    if (typeOf(data) === TYPE_MEUM.object) {
      return Object.entries(data).map(arr => <Select.Option key={arr[0]}>{arr[1]}</Select.Option>)
    }

    // 如果是数组
    if (typeOf(data) === TYPE_MEUM.array) {
      return data.map((item, index) => {
        // 如果数据是字符串，则 key 和 value 都是该值
        if (typeOf(item) === TYPE_MEUM.string) {
          return <Select.Option key={item}>{item}</Select.Option>
        }

        // 如果数据是对象
        if (typeOf(item) === TYPE_MEUM.object) {
          return (
            <Select.Option
              key={item[fields[0]]}
              label={item[fields[1]]}
              {...item}
            >{(filterOptionChildren && filterOptionChildren(item, index)) || item[fields[1]]}
            </Select.Option>
          );
        }

        return null;
      });
    }

    return null;
  };

  return (
    <Select style={{ width: '100%' }} {...rest}>
      {renderOption()}
    </Select>
  );
}
