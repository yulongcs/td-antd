---
title: TdUpload
---

## TdUpload

基于 Upload 的二次封装。项目中需要配置 [localConfig.config.request](/high-coupling/local-config#config)

## 代码演示

```jsx
/**
 * title: 基础上传文件
 * desc: 校验：文件大小、文件类型、文件名长度、文件数
 */
import React, { useState } from 'react';
import { PaperClipOutlined } from '@ant-design/icons';
import { Slider, Form, Checkbox } from 'antd';
import { TdUpload } from 'td-antd';

export default () => {
  const [size, setSize] = useState(20);
  const [nameSize, setNameSize] = useState(200);
  const [fileTypes, setFileTypes] = useState([]);
  const [maxFiles, setMaxFiles] = useState(10);
  
  const ACCEPT = {
    image: 'image/*',
    video: 'video/*',
    audio: 'audio/*',
    jpg: 'image/jpg,image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    txt: 'text/plain',
    pdf: 'application/pdf',
    zip: 'application/zip',
    docx: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    excel: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  return (
    <>
      <Form.Item label="文件大小">
        <Slider defaultValue={size} onChange={(v) => setSize(v)} />
      </Form.Item>
      <Form.Item label="文件名长度">
        <Slider max={200} defaultValue={nameSize} onChange={(v) => setNameSize(v)} />
      </Form.Item>
      <Form.Item label="文件数量">
        <Slider max={10} defaultValue={maxFiles} onChange={(v) => setMaxFiles(v)} />
      </Form.Item>
      <Form.Item label="文件类型">
        <Checkbox.Group onChange={(v) => setFileTypes(v)}>
          {Object.keys(ACCEPT).map(key => <Checkbox value={key} key={key}>{key}</Checkbox>)}
        </Checkbox.Group>
      </Form.Item>
   
      <TdUpload
        size={size}
        maxFiles={maxFiles}
        nameSize={nameSize}
        fileTypes={fileTypes}
        callback={(t, f, fs) => {
          if (t === 'remove') {
            return Promise.resolve();
          }
          if (t === 'after') {
            console.log(fs);
          }
        }}
      />
    </>
  );
}
```

```jsx
/**
 * title: 文件类型校验
 * desc: 使用 callback('validate') 进行校验 excel
 */
import React from 'react';
import { TdUpload } from 'td-antd';

export default () => {
  return (
    <TdUpload
      extra={<a style={{ marginLeft: 12 }} onClick={(e) => { e.stopPropagation() }}>点击下载</a>}
      callback={(t, f, fs) => {
        if (t === 'validate' && !(/^.*(\.xls|\.xlsx)$/.test(f.name))) {
          alert('文件格式不正确');
          return true;
        }
      }}
    />
  );
}
```

```jsx
/**
 * title: 立即上传
 * desc: 点击选择文件后，在 after 回调中进行立即上传操作
 */
import React from 'react';
import { TdUpload } from 'td-antd';

export default () => {
  return (
    <TdUpload
      size={5}
      multiple
      btnText="上传"
      url="/aaa.json"
      callback={(t, f, fs, onUpload) => {
        if (t === 'remove') {
          return Promise.resolve();
        }
        if (t === 'after') {
          // onUpload().then(([files, dataObject]) => {})
        }
      }}
    />
  );
}
```

```jsx
/**
 * title: 图片上传
 */
import React from 'react';
import { TdUpload } from 'td-antd';

export default () => {
  return (
    <TdUpload
      size={5}
      multiple
      isPreview
      btnText="上传"
      fileTypes={['image']}
      tip="仅支持图片格式。"
      listType="picture-card"
      callback={(t, file, files) => {
        if (t === 'before') {
          console.log('开始 before 回调');
        }
        if (t === 'after') {
          console.log(files);
        }
      }}
    />
  );
}
```

```jsx
/**
 * title: 限制图片的宽高
 * desc: 会对图片的宽高进行校验
 */
import React from 'react';
import { TdUpload } from 'td-antd';

export default () => {
  return (
    <TdUpload
      size={5}
      multiple
      btnText="上传"
      scale={[750, 750]}
      fileTypes={['image']}
      tip="仅支持 750*750 的图片"
      listType="picture-card"
    />
  );
}
```

```jsx
/**
 * title: 配置全局的 filterOptions
 * desc: 使用 localConfig.config 配置 filterOptions 的数据过滤
 */
import React from 'react';
import { TdUpload, localConfig } from 'td-antd';

localConfig.config({
  uploadFilterOptions: (item) => ({
    uid: item.fileNo,
    name: item.fileName,
    url: item.filePath,
    ...item,
  }),
});

const files = [
  {
    fileNo: 1,
    fileName: '1.jpg',
    filePath: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    fileNo: 2,
    fileName: '2.jpg',
    filePath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  return (
    <TdUpload isPreview initial={files} />
  );
}
```

```jsx
/**
 * title: 预览，显示/隐藏
 * desc: 使用 TdUpload.Preview 进行展示，show 属性进行显示控制
 */
import React, { useState } from 'react';
import { Switch, Row, Col } from 'antd';
import { TdUpload } from 'td-antd';

const files = [
  {
    name: '1.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col span={12}>
        <Switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          onChange={checked => { setShow(checked) }}
        />
      </Col>
      <Col span={12}>
        <TdUpload.Preview
          show={show}
          initial={files}
          filterOptions={(item, index) => ({...item, uid: index})}
        />
      </Col>
    </Row>
  );
}
```

```jsx
/**
 * title: 自定义图片回显
 * desc: 使用 listType="picture-card"
 */
import React from 'react';
import { TdUpload } from 'td-antd';

const files = [
  {
    name: '1.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  return (
    <TdUpload
      isPreview
      btnText="上传"
      listType="picture-card"
      initial={files}
      filterOptions={(item, index) => ({...item, uid: index})}
    />
  );
}
```

```jsx
/**
 * title: 图片预览
 * desc: 使用 listType="picture-card" 进行展示
 */
import React from 'react';
import { TdUpload } from 'td-antd';

const files = [
  {
    name: '1.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  return (
    <TdUpload.Preview
      initial={files}
      listType="picture-card"
      filterOptions={(item, index) => ({...item, uid: index})}
    />
  );
}
```

```jsx
/**
 * title: 拖拽
 * desc: 内部集成了 dnd 插件
 */
import React from 'react';
import { TdUploadDragable } from 'td-antd';

const files = [
  {
    name: '1.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  return (
    <TdUploadDragable
      initial={files}
      listType="picture-card"
      filterOptions={(item, index) => ({...item, uid: index})}
    />
  );
}
```

```jsx
/**
 * title: 图片固定位（单张）
 * desc: 使用 listType="fixed-card"
 */
import React from 'react';
import { TdUpload } from 'td-antd';

export default () => {
  return (
    <TdUpload
      listType="fixed-card"
      fixedStyles={{width: 300, height: 200}}
      // fixedBgImg={'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg'}
      filterOptions={(item, index) => ({...item, uid: index})}
    />
  );
}
```

```jsx
/**
 * title: 文件仅支持预览，禁用下载
 * desc: 使用 showDownLoad="false"
 */
import React, { useState } from 'react';
import { TdUpload } from 'td-antd';

const files = [
  {
    uid: 1,
    name: '1.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    uid: 2,
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

const files2 = [
  {
    uid: 1,
    name: '3.jpg',
    url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=137628589,3436980029&fm=26&gp=0.jpg',
  }, {
    uid: 2,
    name: '4.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  const [list, setList] = useState(files);
  
  const onClick = () => {
    setList(files2);
  };

  return (
    <>
      <button onClick={onClick}>更换</button>
      <br /><br />
      <TdUpload.Preview
        initial={list}
        filterOptions={(item, index) => ({...item})}
        showDownLoad={false}
      />
    </>
  );
}
```

```jsx
/**
 * title: 二次确认后下载
 * desc: 使用 beforeDownload传入Promise
 */
import React, { useState } from 'react';
import { TdUpload } from 'td-antd';
import { Modal } from 'antd';

const files = [
  {
    uid: 1,
    name: '1.jpg',
    url: '/demo.jpg',
  }, {
    uid: 2,
    name: '2.jpg',
    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
  },
];

export default () => {
  const [list, setList] = useState(files);

  const beforeDownload = () => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '是否确认下载？',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject();
        },
      });
    })
  }

  return (
    <TdUpload.Preview
      initial={list}
      filterOptions={(item, index) => ({...item})}
      beforeDownload={beforeDownload}
    />
  );
}
```

```jsx
/**
 * title: 自定义预览框内容
 * desc: 使用 previewModalProps.children 进行自定义渲染，当返回 null 时，自动进行图片预览
 */
import React, { useState } from 'react';
import { TdUpload } from 'td-antd';
import { Modal } from 'antd';

const files = [
  {
    uid: '511d26',
    name: '1.jpg',
    url: '/demo.jpg',
  },
  {
    uid: '0b6fb9',
    name: 'demo.docx',
    url: '/demo.docx',
  }
];

export default () => {
  return (
    <TdUpload.Preview
      initial={files}
      filterOptions={(item, index) => ({...item})}
      previewModalProps={{
        children: (file) => {
          if (file.name?.includes('docx')) {
            return '.docx文件无法预览，请下载查看';
          }

          return null;
        },
      }}
    />
  );
}
```

```jsx
/**
 * title: 多组件文件上传
 * desc: 使用 Promise.all 进行上传控制
 */
import React, { useRef } from 'react';
import { Button } from 'antd';
import { TdUpload } from 'td-antd';

export default () => {
  const uploadRef = useRef();
  const uploadRef2 = useRef();
  
  const onClick = () => {
    const uploadFn1 = () => {
      return uploadRef.current.onUpload().catch(() => {
        // todo...
        // 如果是在表单中应用，在上传失败后，重置表单
        // form.setFieldsValue({ invoiceFile: null });
      });
    };

    const uploadFn2 = () => {
      return uploadRef2.current.onUpload().catch(() => {
        // todo...
      });
    };
    
    Promise.all([uploadFn1(), uploadFn2()])
      .then(([uploadFiles1, uploadFiles2]) => {
        // todo...
      })
  };

  return (
    <>
      <Button onClick={onClick}>批量上传</Button>
      <br /><br />
      <TdUpload ref={uploadRef} btnText="上传组件1" />
      <br /><br />
      <TdUpload ref={uploadRef2} btnText="上传组件2" />
    </>
  );
}
```

## API

|参数|说明|类型|默认值|版本号|
|:--|:--|:--|:--|:--|
|url|接口地址|String|'/file/upload.json'|
|initial|初始化数据，必须的[数据结构](#initial)|Array|-|
|wrapClassName|最外层样式类|String|-|
|isPreview|是否可预览|Boolean|true|
|params|文件上传的入参|Object|-|
|maxFiles|上传文件数的最大值，会统计组件内所有的文件，包括已上传的|Number|10|
|btnText|按钮文案|String|'上传'|
|btnProps|Button 的 api|Object|{}|
|size|单个文件大小，默认单位 MB|Number|20|
|nameSize|文件名长度，包含后缀|Number|200|
|hideRemoveBtn|是否隐藏删除按钮|Boolean|false|
|showUploadList|是否展示文件列表|Boolean|true|
|filterOptions|在初始化或者上传文件时进行的自定义数据过滤，必须返回数据结果|function(item, index)|-|
|callback|回调函数|function(status, file, files)|-|
|name|发到后台的文件参数名|String|'files'|
|tip|提示文案|String|-|
|scale|图片尺寸校验[规则](#scale-规则)|Array/String|-|
|extra|按钮右边区域的内容|String/ReactNode|-|
|fileTypes|内置了文件[类型](#filetypes)校验|Array|-|
|hidden|上传按钮是否显示|Boolean|false|
|show|组件是否显示|Boolean|true|2.2.0|
|showDownLoad|预览组件是否展示下载按钮|Boolean|true|2.8.0|
|beforeDownload|预览组件下载前事件，必须返回 Promise 对象|Function|-|2.9.7|
|previewModalProps|预览浮层的Modal属性|Object|-|2.12.8|

### listType="fixed-card"

|参数|说明|类型|默认值|
|:--|:--|:--|:--|
|fixedStyles|固定上传图片的固定位置样式|Object|-|
|fixedBgImg|固定上传图片背景图|String|-|

### initial

必要的数据字段

```
{
  fileNo,
  fileName,
  filePath,
}
```

### scale 规则

```
[350, 750]：限制图片宽为 350，高为 750
[350]：限制图片宽为 350，不限制高度
[null, 750]：不限制宽度，限制高度为750
"16:9"：限制宽高比例
```

### fileTypes

内置的文件类型，如：['image', 'pdf']，可搭配原始的 accept 一起使用

```
image: 'image/*',
video: 'video/*',
audio: 'audio/*',
jpg: 'image/jpg,image/jpeg',
png: 'image/png',
gif: 'image/gif',
svg: 'image/svg+xml',
txt: 'text/plain',
pdf: 'application/pdf',
zip: 'application/zip',
docx: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
excel: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
```

### callback

```
callback = (state, file, files, onUpload) => {
  if (state === 'before') {
    // 只会触发一次，上传前
  }
  if (state === 'validate') {
    // 额外的校验，每个文件都会执行一次，返回值为真时，则停止上传
  }
  if (state === 'after') {
    // 只会触发一次，上传后
    onUpload().then(([files, dataObject]) => {
      // todo
    })
  }
  if (state === 'remove') {
    // 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
  }
}
```

### Ref

```
// 重置列表
ref.current.reset();

// 主动的文件上传
ref.current.onUpload().then(([files, dataObject]) => {
  // files = 总的文件列表
  // dataObject = 本次文件上传后返回的数据
}).catch();
```
