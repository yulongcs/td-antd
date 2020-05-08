function TdConfig() {}

const localConfig = {
  config: (params = {}) => {
    const {
      appStore,
      proxy,
    } = params;

    if (appStore) {
      TdConfig.prototype.appStore = appStore;
    }

    if (proxy) {
      TdConfig.prototype.proxy = proxy;
    }
  },
  newInstance: () => {
    return new TdConfig();
  },
};

export default localConfig;
