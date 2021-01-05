function storageWorker(params = {}) {
  const {
    type = 'get', // 使用类型，get = 获取，set = 设置，delete = 删除
    fields = {}, // 当 type = set 时需要赋值的属性。{key: value}
    callback = () => {},
    version = 'v1',
  } = params;

  try {
    const control = {
      query() {
        const storageString = localStorage.getItem(version);
        return storageString ? JSON.parse(storageString) : {};
      },
      get() {
        const res = this.query();
        callback(res);
        return res;
      },
      set() {
        const data = this.query();
        const res = {...data, ...fields, version};
        localStorage.setItem(version, JSON.stringify(res));
        callback(res);
      },
      delete() {
        // 如果 fields 不是数组时，则报错
        if (Array.isArray(fields)) {
          const res = this.query();
          fields.forEach(key => {
            delete res[key];
          });
          localStorage.setItem(version, JSON.stringify(res));
          callback(res);
        }
      },
    };
    return control[type]();
  } catch (e) {
    throw new Error(e);
  }
}

export default storageWorker;
