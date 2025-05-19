import { getAdminUserList, postAdminUserOpenApiDelete } from '@/services/txnbi/admin';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';

const UserDelete: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = async (userIds: string[]) => {
    try {
      await Promise.all(
        userIds.map((id) =>
          postAdminUserOpenApiDelete({ token: localStorage.getItem('token') ?? '', userId: id }),
        ),
      );
      message.success('删除用户成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('删除用户失败');
    }
  };

  const columns: ProColumns<API.UserInfoV0>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        admin: { text: '管理员', status: 'Success' },
        user: { text: '普通用户', status: 'Default' },
        visitor: { text: '访客', status: 'Warning' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              content: '确定要删除该用户吗？此操作不可恢复！',
              onOk: () => handleDelete([record.id]),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.UserInfoV0>
        headerTitle="删除用户"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="batchDelete"
            danger
            onClick={() => {
              if (selectedRowKeys.length === 0) {
                message.warning('请选择要删除的用户');
                return;
              }
              Modal.confirm({
                title: '批量删除',
                content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？此操作不可恢复！`,
                onOk: () => handleDelete(selectedRowKeys as string[]),
              });
            }}
          >
            批量删除
          </Button>,
        ]}
        request={async (params) => {
          const { current, pageSize, ...rest } = params;
          const result = await getAdminUserList({
            token: localStorage.getItem('token') ?? '',
            page: current ?? 1,
            pageSize,
            ...rest,
          });
          return {
            data: result.users || [],
            success: result.statusCode === 0,
            total: result.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>已选 {selectedRowKeys.length} 项</span>
            <a onClick={onCleanSelected}>取消选择</a>
          </Space>
        )}
      />
    </PageContainer>
  );
};

export default UserDelete;
