import locale from './locale';

// 获取语言
const getLanguage = (l = 'zh') => {
  return locale[l];
};

export { getLanguage };
