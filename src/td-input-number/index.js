import React from 'react';
import { InputNumber } from 'antd';

const symbolReg = {
  '¥': /\¥\s?|(,*)/g,
  '$': /\$\s?|(,*)/g,
  'NT$': /\NT\s?|(,*)/g,
  'zł': /\zł\s?|(,*)/g,
  '€': /\€\s?|(,*)/g,
};

export default ({ unit = '', ...rest }) => {
  const isMoneySymbol = () => {
    const symbol = Object.keys(symbolReg);
    return symbol.includes(unit);
  };

  return (
    <InputNumber
      formatter={value => isMoneySymbol() ? `${unit}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : `${value}${unit}`}
      parser={value => value.replace(unit, '')}
      {...rest}
    />
  );
}
