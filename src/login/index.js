import React, { useState } from 'react';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';
import localeLanguage from './locale';

export default (props) => {
  const prop = {
    proxy: '/srm',
    locale: 'en',
    module: 'login',
    ...props,
  };
  const [type, setType] = useState(prop.module);
  const language = localeLanguage[prop.locale];
  const components = {
    login: <Login {...prop} setType={setType} language={language} />,
    reset: <ResetPassword {...prop} setType={setType} language={language} />,
    register: <Register {...prop} setType={setType} language={language}  />,
  };

  return components[type];
}
