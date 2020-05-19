import React, { useState } from 'react';
import { Steps } from 'antd';
import Account from './Account';
import VerificationCode from './VerificationCode';
import Password from './Password';
import Successful from './Successful';
import '../index.less';

const { Step } = Steps;

export default (props) => {
  const {
    setType,
    language,
    onBackHomepage,
    homepagePath = '/welcome',
  } = props;
  const [account, setAccount] = useState('');
  const [next, setNext] = useState(0);
  const params = {
    language,
    setType,
    setAccount,
    account,
    setNext,
    proxy: props.proxy,
    onBackHomepage,
    homepagePath,
  };
  const components = [
    <Account {...params} />,
    <VerificationCode {...params} />,
    <Password {...params} />,
    <Successful {...params} />,
  ];

  return (
    <div className="ry_reset_container">
      <Steps size="small" current={next} className="ry_reset_steps">
        <Step title={language.step_0} />
        <Step title={language.step_1} />
        <Step title={language.step_2} />
        <Step title={language.step_3} />
      </Steps>
      {components[next]}
    </div>
  );
}
