import React, { useState } from 'react';
import { Steps } from 'antd';
import Account from './Account';
import VerificationCode from './VerificationCode';
import Password from './Password';
import Successful from './Successful';
import { getLanguage } from '../util';
import '../index.less';

const { Step } = Steps;

export default (props) => {
  const {
    proxy = '/srm',
    locale = 'zh',
    onBackHomepage,
    homepagePath = '/welcome',
    onSignIn = () => {}, // 去登录的回调函数
  } = props;
  const [account, setAccount] = useState('');
  const [next, setNext] = useState(0);
  const language = getLanguage(locale);
  const params = {
    onSignIn,
    language,
    setAccount,
    account,
    setNext,
    proxy,
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
