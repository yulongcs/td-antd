import React, { forwardRef, useImperativeHandle } from 'react';
import QRCode from 'qrcode.react';
import genNonDuplicateID from '../tools/genNonDuplicateID';

export default forwardRef((props, ref) => {
  const {
    value,
    ...rest
  } = props;
  const id = `qrcode-${genNonDuplicateID(5)}`;

  useImperativeHandle(ref, () => ({
    url: () => {
      const canvas = document.getElementById(id);

      return canvas.toDataURL('image/png');
    },
  }));

  if (value) {
    return (
      <QRCode id={id} value={value} {...rest} />
    );
  }

  return null;
})
