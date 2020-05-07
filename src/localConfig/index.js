function TdConfig() {}

const localConfig = {
  config: (params = {}) => {
    const {
      appStore,
    } = params;

    if (appStore) {
      TdConfig.prototype.appStore = appStore;
    }
  },
  newInstance: () => {
    return new TdConfig();
  },
};

export default localConfig;
