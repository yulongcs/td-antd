import React from 'react';
import localeLanguage from './locale';
import localConfig from '../local-config';

export default ({ data, locale, ...rest }) => {
  const newInstance = localConfig.newInstance();
  const language = localeLanguage[locale || newInstance.locale || 'en'];

  return {
    current: data.pageNum || data.currPageNo || 1,
    pageSize: data.pageSize || data.limit || 20,
    total: data.totalCnt || data.total || 1,
    showTotal: total => <span dangerouslySetInnerHTML={{__html: language.totalTip.replace('$1', `<span style="color:#f0882d">${total}</span>`)}} />,
    ...rest,
  }
};
