import React, { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
import redirect from '../../tools/redirect';
import countdown from '../../tools/countdown';

export default (props) => {
  const {
    setType,
    setNext,
    language,
    onBackHomepage,
    homepagePath,
  } = props;
  const [count, setCount] = useState(5);

  useEffect(() => {
    countdown({
      defaultCount: count,
      callback: (nowCount) => {
        setCount(nowCount);
        if (nowCount === 0) {
          setType('login');
          setNext(0);
        }
      },
    })
  }, []);

  const onBack = () => {
    if (onBackHomepage) {
      onBackHomepage();
    } else {
      redirect(homepagePath);
    }
  };

  return (
    <Result
      status="success"
      title={language.succ_title}
      subTitle={`${count}s ${language.succ_sub_title}`}
      extra={[
        <Button key="buy" onClick={onBack}>{language.succ_back_homepage}</Button>,
        <Button type="primary" key="console" onClick={() => { setType('login') }}>
          {language.login_button_ok_text}
        </Button>,
      ]}
    />
  );
}
