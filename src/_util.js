// 报错提示
export const warning = (component = '', message = '') => {
  console.error(`Warning: [${component}] ${message}`);
};

// 判断数据类型
export const typeOf = (obj, type) => Object.prototype.toString.call(obj) === `[object ${type}]`;
