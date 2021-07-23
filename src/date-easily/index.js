import React from 'react';
import { DatePicker } from 'antd';
import momentToString from '../tools/momentToString';

const DateEasily = ({ value, format, type = '', ...rest }) => {
  const Component = type ? DatePicker[type] : DatePicker;

  let momentedValue;
  if (Array.isArray(value)) {
    const [start, end] = value;
    momentedValue = [momentToString(start, format), momentToString(end, format)];
  } else if (value) {
    momentedValue = momentToString(value, format);
  } else {
    momentedValue = undefined;
  }

  if (Component) {
    return (
      <Component
        value={momentedValue}
        {...rest}
      />
    );
  }

  return null;
};

export default DateEasily;
