import { fetch } from 'dva';
import { message } from 'antd';

// http请求的状态校验
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (/^50(.)$/.test(response.status)) {
    return message.warning('服务升级中...');
  }
  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/*
* @params
*   url // 请求地址
*   method // 请求方式，默认 get 请求
*   headers // 请求头信息
*   body // 除 get 请求外的入参参数
*   onSuccess // 业务处理成功后的回调函数
*   onError // 业务处理失败后的回调函数
*   isToast // 是否暂时错误码
* */
export default function request({ url, method = 'GET', headers = { 'pragma': 'no-cache' }, body, onSuccess, onError, isToast = true }) {
  const newOptions = { credentials: 'include', method, body, headers };
  const methodArr = ['POST', 'PUT', 'DELETE'];
  if (methodArr.indexOf(method) > -1) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then((data) => {
      if (data.success) return onSuccess && onSuccess(data);
      // eslint-disable-next-line
      isToast && message.error(data.errorMessage || data.dataObject || 'system error');
      // eslint-disable-next-line
      onError && onError(data);
    })
    .catch((error) => {
      if ('stack' in error && 'message' in error) {
        message.error(error.message || `error: ${url}`);
      }
    });
}
