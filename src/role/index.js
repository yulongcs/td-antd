import React, { useState, useEffect, useRef } from 'react';
import { Popconfirm, message, Form, Input, Tree, Button, Space } from 'antd';
import TablePage from '../table-page';
import ModalBox from '../modal-box';
import Permission from '../permission';
import localConfig from '../local-config';

let isCheck = false;

export default (props) => {
  const {
    menuTreeUrl = '/system/menu/list/tree.json',
    roleMenuUrl = '/user/getRoleMenu.json',
    addRoleUrl = '/system/role/add.json',
    editRoleUrl = '/system/role/edit.json',
    removeUrl = '/system/role/remove.json',
    disabledRoleCode = [],
  } = props;
  const tablePageRef = useRef();
  const modalRef = useRef();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null); // 当前选中的数据
  const [menuCodes, setMenuCodes] = useState([]); // 当前选中角色的权限码
  const [authorityTree, setAuthorityTree] = useState([]); // 完整的权限码
  const { request } = localConfig.newInstance(); // 获取 fetch 实例
  const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
  }, {
    title: '备注',
    dataIndex: 'description',
  }, {
    title: '操作',
    render: (r) => (
      <Space>
        <Permission code="role_detail">
          <a onClick={() => { isCheck = true; queryMenuCodes(r) }}>查看</a>
        </Permission>
        <Permission code="role_edit">
          <a onClick={() => { queryMenuCodes(r) }}>修改</a>
        </Permission>
        <Permission code="role_del">
          <Popconfirm title="您确定删除该角色?" onConfirm={() => onRemove(r.roleCode)}>
            <a>删除</a>
          </Popconfirm>
        </Permission>
      </Space>
    ),
  }];

  useEffect(() => {
    if (request) {
      request({
        url: menuTreeUrl,
        onSuccess: (res) => {
          setAuthorityTree(res.dataObject);
        },
      });
    }
  }, [request]);

  // 获取对应角色的权限码
  const queryMenuCodes = (r) => {
    request({
      url: `${roleMenuUrl}?roleCode=${r.roleCode}`,
      onSuccess: ({ dataObject }) => {
        const record = {...r, menuCodes: dataObject.menuCodes};
        setMenuCodes(dataObject.menuCodes);
        setActive(record);
        form.setFieldsValue(record);
        modalRef.current.visible(true);
      },
    });
  };

  // 新增、修改
  const onFinish = () => {
    if (Permission.is(['role_add', 'role_edit'])) {
      form.validateFields().then(values => {
        setLoading(true);
        request({
          url: active ? editRoleUrl : addRoleUrl,
          method: 'POST',
          body: {...active, ...values, menuCodes},
          onSuccess: () => {
            message.success('操作成功');
            modalRef.current.visible(false);
            tablePageRef.current.query();
          },
        }).finally(() => {
          setLoading(false);
        });
      });
    } else {
      modalRef.current.visible(false);
    }
  };

  // 删除角色
  const onRemove = (roleCode) => {
    if (disabledRoleCode && disabledRoleCode.includes(roleCode)) {
      request({
        url: `${removeUrl}?roleCode=${roleCode}`,
        method: 'DELETE',
        onSuccess: () => {
          message.success('删除成功');
          tablePageRef.current.query();
        },
      });
    } else {
      message.warning('无权删除该角色');
    }
  };

  // 获取状态
  const getState = () => {
    if (active && isCheck) {
      return { footer: false }
    }

    return {};
  };

  return (
    <React.Fragment>
      <TablePage
        line={false}
        ref={tablePageRef}
        columns={columns}
        url="/system/role/page.json"
        success={(res) => ({ ...res, values: res.datas })}
        extra={
          <Permission code="role_add">
            <Button
              type="primary"
              onClick={() => {
                modalRef.current.visible(true)}
              }
            >新增
            </Button>
          </Permission>
        }
      />
      <ModalBox
        {...getState()}
        ref={modalRef}
        title="查看"
        onOk={onFinish}
        destroyOnClose
        confirmLoading={loading}
        afterClose={() => {
          isCheck = false;
          setActive(null);
          setMenuCodes([]);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            required
            label="角色名称"
            name="roleName"
          >
            <Input maxLength={10} placeholder="最多10个字符" />
          </Form.Item>
          <Form.Item
            label="角色备注"
            name="description"
          >
            <Input.TextArea placeholder="请填写角色备注，最多30个字符"  maxLength={30} rows={4} />
          </Form.Item>
          <Form.Item
            required
            label="权限配置"
            name="menuCodes"
          >
            <Tree
              checkable
              checkedKeys={menuCodes}
              treeData={authorityTree}
              onCheck={(checkKeys) => {
                setMenuCodes(checkKeys);
                form.setFieldsValue({ menuCodes: checkKeys });
              }}
            />
          </Form.Item>
        </Form>
      </ModalBox>
    </React.Fragment>
  );
}
