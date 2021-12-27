import React from 'react';
import { Button } from 'antd';
import redirect from '../redirect';
import deepGet from '../tools/deepGet';
import typeOf from '../tools/typeOf';
import localConfig from '../local-config';

const Permission = (props) => {
  const {
    code = '',
    keyword = 'permissions',
    homePath = '/welcome', // 首页地址
    isShow = false, // 是否展示 403 权限提示
    children = null, // 在无组件返回时，必须返回null，否则 react 报错
  } = props;

  if (is(code, keyword)) {
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

  if (permission && appStore && code) {
    const values = deepGet(appStore.getState().global, keyword);

    if (typeOf(values, 'String') && typeOf(code, 'String')) {
      return values === code;
    }

    if (typeOf(code, 'Array')) {
      return values.some(item => code.includes(item))
    }

    return values.includes(code);
  } else {
    return true;
  }
};

const useRole = () => {
  const { appStore } = localConfig.newInstance(); // 获取实例

  const { roleType } = appStore?.getState().global.info;

  return {
    SA: roleType === 'SUPPER',                    // 超级管理员
    PM: roleType === 'PLATFORM',                  // 平台
    EP: roleType === 'ENTERPRISE',                // 企业
    AG: roleType === 'AGENT',                     // 代理商
    ME: roleType === 'MEDICINE',                  // 医疗机构
    AR: roleType === 'ACADEMIC_REPRESENTATIVE',   // 代表/MSL
    MW: roleType === 'MEDICAL_WORKER',            // 医生/专家
    PERSONAL: ['ACADEMIC_REPRESENTATIVE', 'MEDICAL_WORKER'].includes(roleType),
    roleType,
  };
};

Permission.is = is;
Permission.useRole = useRole;

export default Permission;
