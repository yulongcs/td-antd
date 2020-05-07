import toast from '../toast';

function downloadBlob(params) {
  try {
    const { url, filename, body } = params;
    const newOptions = { credentials: 'include', body };

    if (body) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.method = 'POST';
      newOptions.body = JSON.stringify(newOptions.body);
    }

    return fetch(url, newOptions)
      .then(res => res.json().then(r => {
        if (r.success) {
          return res;
        }
        const error = new Error(r.errorMessage);
        error.response = res;

        throw error;
      }))
      .then(res => res.blob().then(blob => {
        const name = filename || res.headers.get('Content-Disposition'); // 获取 headers 中的文件名
        // for IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, name);
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
          const blobUrl = window.URL.createObjectURL(blob);
          a.href = blobUrl;
          a.download = name;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          a.remove();
        }
      }))
      .catch((error) => {
        if ('stack' in error && 'message' in error) {
          toast({ type: 'error', text: error.message });
        }

        return error;
      });
  } catch (e) {
    throw new TypeError(e);
  }
}

export default downloadBlob;