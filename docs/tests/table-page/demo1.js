import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { TablePage } from 'td-antd';

const BTN_TEXT = {
  less: '年龄小于20',
  greater: '年龄大于20',
};

const Demo = () => {
  const [rowSelection, setRowSelection] = useState(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dataSource = [];

  for (let i = 1; i <= 30; i++) {
    dataSource.push({
      key: i,
      name: 'John Brown',
      age: i + 12,
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '介绍',
      dataIndex: 'description',
    },
  ];

  const onLess = () => {
    setRowSelection({
      type: 'less',
      getCheckboxProps: ({ age }) => ({ disabled: age > 20 }),
      onChange: sKeys => {
        setSelectedRowKeys(sKeys);
      },
    });
  };

  const onGreater = () => {
    setRowSelection({
      type: 'greater',
      getCheckboxProps: ({ age }) => ({ disabled: age < 20 }),
      onChange: sKeys => {
        setSelectedRowKeys(sKeys);
      },
    });
  };

  const onCancel = () => {
    setSelectedRowKeys([]);
    setRowSelection(undefined);
  };

  const onOk = () => {
    alert(`${BTN_TEXT[rowSelection.type]}的个数是：${selectedRowKeys.length}`);
  };

  return (
    <TablePage
      line={false}
      columns={columns}
      tableProps={{
        rowKey: 'key',
        dataSource,
        rowSelection,
      }}
      extra={
        <Space>
          {rowSelection ? (
            <React.Fragment>
              <Button onClick={onCancel} danger>取消</Button>
              <Button disabled={!selectedRowKeys[0]} type="primary" onClick={onOk}>{BTN_TEXT[rowSelection.type]}</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button type="primary" ghost onClick={onLess}>年龄小于20</Button>
              <Button type="primary" ghost onClick={onGreater}>年龄大于20</Button>
            </React.Fragment>
          )}
        </Space>
      }
    />
  );
};

export default Demo;
