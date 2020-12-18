function validateFields(form, param, param2) {
  const callback = typeof param === 'function' ? param : param2;
  const fields = Array.isArray(param) ? param : null;

  form.validateFields(fields).then((values) => {
    callback(values);
  }).catch((errorInfo) => {
    console.log(errorInfo);
    if (errorInfo.errorFields) {
      form.scrollToField((errorInfo.errorFields[0].name)[0]);
    }
  })
}

export default validateFields;
