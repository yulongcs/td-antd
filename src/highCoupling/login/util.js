import locale from './locale';

// 获取语言
const getLanguage = (l = 'en') => {
  return locale[l];
};

export { getLanguage };