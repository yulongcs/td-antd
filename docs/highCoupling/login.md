---
title: Login
---

## Login

FoodPanel 产品的组合登录组件，包含 "登录、注册、重置密码"，支持中英文。

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Login } from 'td-antd';

export default () => {
  const [locale, setLocale] = useState('zh');

  return (
    <React.Fragment>
      <Button onClick={() => { setLocale(locale === 'zh' ? 'en' : 'zh') }}>切换语言</Button>
      <br />
      <br />
      <Login
        locale={locale}
        onSignInSuccess={(res) => {
          console.log(res);
          alert('登录成功');
        }}
      />
    </React.Fragment>
  );
}
```

### API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|proxy|代理标示|String|/srm|
|locale|语言，可设置为 en/zh|String|en|
|customSingInTitle|自定义登录页标题名称|String/ReactNode|-|
|onSignInSuccess|登录成功后的回调函数|Function({ dataObject, go })|-|
|onSignUpSuccess|注册成功后的回调函数|Function(dataObject)|-|
|onBackHomepage|自定义返回首页的回调函数|Function|-|
|homepagePath|首页地址，onBackHomepage存在时，该属性失效|String|/welcome|

> 注意：需要 localConfig.config 设置 appStore 后才能正常使用 homepagePath 属性

## Login.SignIn

独立的登录组件

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Login } from 'td-antd';

export default () => {
  const [locale, setLocale] = useState('zh');

  return (
    <React.Fragment>
      <Button onClick={() => { setLocale(locale === 'zh' ? 'en' : 'zh') }}>切换语言</Button>
      <br />
      <br />
      <Login.SignIn
        locale={locale}
        onSignIn={(res) => {
          console.log(res);
          alert('登录成功');
        }}
      />
    </React.Fragment>
  );
}
```

### API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|proxy|代理标示|String|/srm|
|locale|语言，可设置为 en/zh|String|en|
|customTitle|自定义登录页标题名称|String/ReactNode|-|
|isSignUpButton|是否有注册按钮|Boolean|true|
|isResetButton|是否有重置按钮|Boolean|true|
|onSignIn|登录成功后的回调函数|Function({ dataObject, go })|-|
|onSignUp|点击注册按钮事件，isSignUpButton = true 时可生效|Function|-|
|onResetPassword|忘记密码点击事件，isResetButton = true 时可生效|Function|-|

## Login.SignUp

独立的注册组件

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Login } from 'td-antd';

export default () => {
  const [locale, setLocale] = useState('zh');

  return (
    <React.Fragment>
      <Button onClick={() => { setLocale(locale === 'zh' ? 'en' : 'zh') }}>切换语言</Button>
      <br />
      <br />
      <Login.SignUp
        locale={locale}
        onSignUp={(res) => {
          console.log(res);
          alert('注册成功');
        }}
        onSignIn={() => {
          alert('=== 去登录页面 ===');
        }}
      />
    </React.Fragment>
  );
}
```

### API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|proxy|代理标示|String|/srm|
|locale|语言，可设置为 en/zh|String|en|
|onSignIn|点击去登录的回调|Function|-|
|onSignUp|注册成功后的回调|Function(dataObject)|-|

## Login.ResetPassword

独立的密码重置组件

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Login } from 'td-antd';

export default () => {
  const [locale, setLocale] = useState('zh');

  return (
    <React.Fragment>
      <Button onClick={() => { setLocale(locale === 'zh' ? 'en' : 'zh') }}>切换语言</Button>
      <br />
      <br />
      <Login.ResetPassword
        locale={locale}
        onSignIn={() => {
          alert('=== 去登录页面 ===');
        }}
      />
    </React.Fragment>
  );
}
```

### API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|proxy|代理标示|String|/srm|
|locale|语言，可设置为 en/zh|String|en|
|onSignIn|点击去登录的回调|Function|-|
|onBackHomepage|自定义返回首页的回调函数|Function|-|
|homepagePath|首页地址，onBackHomepage存在时，该属性失效|String|/welcome|
