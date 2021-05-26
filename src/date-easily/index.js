import React from 'react';
import { DatePicker } from 'antd';
import momentToString from '../tools/momentToString';

const DateEasily = ({ value, format, Component = DatePicker, ...rest }) => {
  let momentedValue;
  if (Array.isArray(value)) {
    const [start, end] = value;
    momentedValue = [momentToString(start, format), momentToString(end, format)];
  } else if (value) {
    momentedValue = momentToString(value, format);
  } else {
    momentedValue = undefined;
  }

  return (
    <Component
      value={momentedValue}
      {...rest}
    />
  );
};

export default DateEasily;
