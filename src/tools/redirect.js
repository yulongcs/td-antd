import { routerRedux } from 'dva';

function TdAntdRedirect() {}

const redirect = {
  config: (params = {}) => {
    const { appStore } = params;
    if (appStore) {
      TdAntdRedirect.prototype.appStore = appStore;
    }
  },
  to: (path, dispatch) => {
    if (dispatch) {
      dispatch(routerRedux.push(path));
    } else {
      const instance = new TdAntdRedirect();

      instance.appStore.dispatch(routerRedux.push(path));
    }
  },
};

export default redirect;
