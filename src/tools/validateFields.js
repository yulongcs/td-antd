function validateFields(params = {}, cb = () => {}) {
  const { form, fields = null, setLoading } = params;

  try {
    form.validateFields(fields).then((values) => {
      cb(values);
    }).catch((errorInfo) => {
      // 当表单错误函数存在时，页面拉到对应错误位置
      if (errorInfo.errorFields) {
        form.scrollToField((errorInfo.errorFields[0].name)[0]);
      }

      // 当 loading 控制函数存在时，将其关闭
      if (setLoading && typeof setLoading === 'function') {
        setLoading(false);
      }
    })
  } catch (e) {
    throw new TypeError(e);
  }
}

export default validateFields;
