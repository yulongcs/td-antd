function storageWorker(props) {
  const {
    type = 'get', // 使用类型，get = 获取，set = 设置
    fields = {}, // 当 type = set 时需要赋值的属性。{key: value}
    callback = () => {},
  } = props;
  // 默认数据
  const defaultStorage = {
    version: 'v1', // 版本号
  };

  try {
    const data = localStorage.getItem(defaultStorage.version);
    const control = {
      get() {
        callback(data ? JSON.parse(data) : {});
      },
      set() {
        const res = data ? {...JSON.parse(data), ...fields} : {...defaultStorage, ...fields};
        localStorage.setItem(defaultStorage.version, JSON.stringify(res));
        callback(res);
      },
    };
    control[type]();
  } catch (e) {
    throw new Error(e);
  }
}

export default storageWorker;