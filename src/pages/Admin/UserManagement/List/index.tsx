import { getAdminUserList } from '@/services/txnbi/admin';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React from 'react';

const UserList: React.FC = () => {
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
  ];

  return (
    <PageContainer>
      <ProTable<API.UserInfoV0>
        headerTitle="用户列表"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
      />
    </PageContainer>
  );
};

export default UserList;
