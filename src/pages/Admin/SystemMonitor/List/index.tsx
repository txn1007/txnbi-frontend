import { getAdminLogList } from '@/services/txnbi/adminLog';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const LogList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OperationLog>[] = [
    {
      title: '日志ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 80,
    },
    {
      title: '操作类型',
      dataIndex: 'operationType',
      valueType: 'select',
      valueEnum: {
        create: { text: '创建', status: 'Success' },
        update: { text: '更新', status: 'Processing' },
        delete: { text: '删除', status: 'Error' },
        query: { text: '查询', status: 'Default' },
      },
    },
    {
      title: '操作用户',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: '操作内容',
      dataIndex: 'content',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      valueType: 'text',
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.LogInfoV0>
        headerTitle="日志查询"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const { current, pageSize, ...rest } = params;
          const result = await getAdminLogList({
            token: localStorage.getItem('token') ?? '',
            page: current,
            pageSize,
            ...rest,
          });
          return {
            data: result.logs || [],
            success: result.statusCode === 0,
            total: result.total || 0,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default LogList;
