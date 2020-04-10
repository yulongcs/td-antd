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
      .then(res => res.blob().then(blob => {
        // for IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
          const blobUrl = window.URL.createObjectURL(blob);
          // 获取 headers 中的文件名
          // const filename = res.headers.get('Content-Disposition');
          a.href = blobUrl;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          a.remove();
        }
      }))
  } catch (e) {
    throw new TypeError(e);
  }
}

export default downloadBlob;