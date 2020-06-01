import React from 'react';
import localeLanguage from './locale';

export default ({ data, locale = 'en', ...rest }) => {
  const language = localeLanguage[locale];

  return {
    hideOnSinglePage: true,
    current: data.pageNum || data.currPageNo || 1,
    pageSize: data.pageSize || data.limit || 20,
    total: data.totalCnt || data.total || 1,
    showTotal: total => <span dangerouslySetInnerHTML={{__html: language.totalTip.replace('$1', `<span style="color:#f0882d">${total}</span>`)}} />,
    ...rest,
  }
};