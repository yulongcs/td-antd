---
title: validateFields
---

## validateFields

[form.validateFields](https://ant-design.gitee.io/components/form-cn/#validateFields-%E8%BF%94%E5%9B%9E%E7%A4%BA%E4%BE%8B) 的简化使用，在 catch 中内置处理了 scrollToField 的错误滚动

### API

function(form, fields, callback)

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|form|由 Form.useForm() 获取|form|-|
|fields|需要进行校验的字段|Array[String]|-|
|callback|验证通过后的回调函数|function(values)|-|

### 用法对比1

`校验表单的所有项`

```
// 现在
validateFields(form, values => {
  // you codes
})

// 以前
form.validateFields().then(values => {
  // you codes
}).catch(() => {
  // you catch
})
```

### 用法对比2

`校验表单部分项`

```
// 现在
validateFields(form, ['name', 'age'], values => {
  // you codes
})

// 以前
form.validateFields(['name', 'age']).then(values => {
  // you codes
}).catch(() => {
  // you catch
})
```
