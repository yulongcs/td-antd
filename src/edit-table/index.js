import React, { useState } from 'react';
import { Table, Form, Space } from 'antd';
import './index.less';

const EditableCell = ({
  editing,
  children,
  FormItem,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? FormItem : children}
    </td>
  );
};

export default (props) => {
  const {
    rowKey = '',
    onFinish = () => {},
    editText = '修改',
    cancelText = '取消',
    okText = '保存',
    ...rest
  } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(''); // 当前编辑的
  const isEditing = (record) => record[rowKey] === editingKey;
  const columns = [...(props.columns || []), {
    fixed: 'right',
    title: '操作',
    render: (t, r) => {
      const editable = isEditing(r);
      return editable ? (
        <Space>
          <a onClick={() => save(r)}>{okText}</a>
          <a onClick={cancel}>{cancelText}</a>
        </Space>
      ) : (
        <a onClick={() => edit(r)}>{editText}</a>
      );
    },
  }].map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        FormItem: col.FormItem,
        editing: isEditing(record),
      }),
    };
  });

  // 点击编辑按钮，开始进行编辑
  const edit = (r) => {
    form.setFieldsValue(r);
    setEditingKey(r[rowKey]);
  };

  // 取消
  const cancel = () => {
    form.resetFields();
    setEditingKey('');
  };

  // 保存
  const save = (record) => {
    form.validateFields().then(values => {
      onFinish({
        values: {...record, ...values},
        setEditingKey,
      });
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <Form form={form}>
      <Table
        {...rest}
        rowKey={rowKey}
        columns={columns}
        rowClassName="td-editable-row"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
}
