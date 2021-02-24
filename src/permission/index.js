import React from 'react';
import { Button } from 'antd';
import redirect from '../redirect';
import localConfig from '../local-config';

const Permission = (props) => {
  const {
    code = '',
    homePath = '/welcome', // 首页地址
    isShow = false, // 是否展示 403 权限提示
    children = null, // 在无组件返回时，必须返回null，否则 react 报错
  } = props;

  if (is(code)) {
    return children;
  }

  if (isShow) {
    return (
      <div>
        <h1>无权访问该内容，请联系管理员！</h1>
        <Button
          type="primary"
          onClick={() => {
            redirect(homePath)
          }}
        >返回首页
        </Button>
      </div>
    );
  }

  return null;
};

const is = (code, keyword = 'permissions') => {
  const { permission, appStore } = localConfig.newInstance(); // 获取实例

  if (permission && appStore) {
    if (!code) {
      return true;
    }

    const arr = appStore.getState().global[keyword]; // 系统返回的权限码内容

    if (arr) {
      // 当 code 是数组时
      if (code instanceof Array) {
        const isTrue = arr.some(item => code.includes(item));

        if (isTrue) {
          return true;
        }
      }

      // 当 code 为字符串时
      if (typeof code === 'string' && arr.includes(code)) {
        return true;
      }
    }
  } else {
    return true;
  }
};

Permission.is = is;

export default Permission;
