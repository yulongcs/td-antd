import { routerRedux } from 'dva';
import localConfig from '../local-config';

const redirect = (path, dispatch, blank) => {
  if (blank === '_blank') {
    return window.open(path);
  }

  if (dispatch) {
    return dispatch(routerRedux.push(path));
  }

  const newInstance = localConfig.newInstance();
  try {
    newInstance.appStore.dispatch(routerRedux.push(path));
  } catch (e) {
    throw new Error(e);
  }
};

export default redirect;
