import { getAdminLogList, postAdminLogOpenApiDelete } from '@/services/txnbi/adminLog';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';

const LogDelete: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = async (logIds: string[]) => {
    try {
      await Promise.all(logIds.map((id) => postAdminLogOpenApiDelete({ logId: id })));
      message.success('删除日志成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('删除日志失败');
    }
  };

  const columns: ProColumns<API.LogInfoV0>[] = [
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
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              content: '确定要删除该日志吗？此操作不可恢复！',
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
      <ProTable<API.LogInfoV0>
        headerTitle="删除日志"
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
                message.warning('请选择要删除的日志');
                return;
              }
              Modal.confirm({
                title: '批量删除',
                content: `确定要删除选中的 ${selectedRowKeys.length} 条日志吗？此操作不可恢复！`,
                onOk: () => handleDelete(selectedRowKeys as string[]),
              });
            }}
          >
            批量删除
          </Button>,
        ]}
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

export default LogDelete;
