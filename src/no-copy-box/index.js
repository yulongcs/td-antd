import React from 'react';
import './index.less';

const NoCopyBox = (props) => (
  <div onCopy={(e) => e.preventDefault()} className="td-noCopyBox">
    {props.children}
  </div>
);

export default NoCopyBox;
