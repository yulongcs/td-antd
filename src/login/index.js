import React, { useState } from 'react';
import SignIn from './sign-in';
import ResetPassword from './reset-password';
import SignUp from './sign-up';

const Login = (props) => {
  const {
    proxy = '/srm',
    locale = 'zh',
    onBackHomepage,
    homepagePath,
    customSingInTitle,
    onSignInSuccess = () => {}, // 登录成功后
    onSignUpSuccess = () => {}, // 注册成功后
  } = props;
  const [type, setType] = useState('login');
  const components = {
    login: (
      <SignIn
        proxy={proxy}
        locale={locale}
        onSignIn={onSignInSuccess}
        customTitle={customSingInTitle}
        onSignUp={() => { setType('signup') }}
        onResetPassword={() => { setType('reset') }}
      />
    ),
    signup: (
      <SignUp
        proxy={proxy}
        locale={locale}
        onSignUp={onSignUpSuccess}
        onSignIn={() => { setType('login') }}
      />
    ),
    reset: (
      <ResetPassword
        proxy={proxy}
        locale={locale}
        homepagePath={homepagePath}
        onBackHomepage={onBackHomepage}
        onSignIn={() => { setType('login') }}
      />
    ),
  };

  return components[type];
};

Login.SignIn = SignIn;
Login.SignUp = SignUp;
Login.ResetPassword = ResetPassword;

export default Login;
