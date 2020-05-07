import { routerRedux } from 'dva';
import localConfig from '../localConfig';

const redirect = (path, dispatch) => {
  if (dispatch) {
    dispatch(routerRedux.push(path));
  } else {
    const newInstance = localConfig.newInstance();
    try {
      newInstance.appStore.dispatch(routerRedux.push(path));
    } catch (e) {
      throw new Error(e);
    }
  }
};

export default redirect;
