---
title: TablePage
---

## TablePage

基于 Table 封装的简易列表页

## API

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|url|列表请求地址|String|-|
|tableProps|支持原 [Table](https://3x.ant.design/components/table-cn/) 的 API|Object|{}|
|columns|表格列的配置描述，同原 Table 组件|ColumnProps[]|[]|
|searchChildren|搜索项的子节点|ReactNode|-|
|searchFormProps|SearchForm 组件的属性|Object|{}|
|searchReturn|自定义搜索栏的回调函数，必须返回结果对象给组件以供搜索使用|Function(values)|-|
|defaultParams|默认参数，一般是不变的|Object|{}|
|success|请求成功后的回调函数|Function({ values = [] })|-|

### Ref，使用 ref.current 进行调用

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|searchFormRef|searchForm 的 form 对象|Object|-|
|query|重新获取列表数据|Function(params, reset)|-|

> 注意：需要 localConfig.config 设置 request 后才能正常使用
