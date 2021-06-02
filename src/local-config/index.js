function TdConfig() {}

const localConfig = {
  config: (params = {}) => {
    Object.entries(params).forEach(([key, value]) => {
      TdConfig.prototype[key] = value;
    });
  },
  newInstance: () => {
    return new TdConfig();
  },
};

export default localConfig;
