// 报错提示
export const warning = (component = '', message = '') => {
  console.error(`Warning: [${component}] ${message}`);
};
