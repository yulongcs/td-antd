import React, { useState } from 'react';
import { Button } from 'antd';
import { Magic } from 'td-antd';
import './demo1.less';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  return (
    <Magic
      loading={loading}
      footerClassName="demo1_magic_footer"
      footer={footerVisible && (
        <React.Fragment>
          <Button onClick={() => setLoading(false)}>取消</Button>
          <Button type="primary" onClick={() => setLoading(true)}>开始 Loading</Button>
        </React.Fragment>
      )}
    >
      <Button onClick={() => setFooterVisible(!footerVisible)}>{footerVisible ? '取消页脚' : '展开页脚'}</Button>
    </Magic>
  );
};

export default Demo;
