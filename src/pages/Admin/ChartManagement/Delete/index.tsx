import { getAdminChartList, postAdminChartOpenApiDelete } from '@/services/txnbi/adminChart';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import React, { useRef, useState } from 'react';

const ChartDelete: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = async (chartIds: string[]) => {
    try {
      await Promise.all(chartIds.map((id) => postAdminChartOpenApiDelete({ chartId: id })));
      message.success('删除图表成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('删除图表失败');
    }
  };

  const columns: ProColumns<API.ChartInfoV0>[] = [
    {
      title: '图表ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 80,
    },
    {
      title: '图表名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '图表类型',
      dataIndex: 'chartType',
      valueType: 'select',
      valueEnum: {
        bar: { text: '柱状图' },
        line: { text: '折线图' },
        pie: { text: '饼图' },
        scatter: { text: '散点图' },
        radar: { text: '雷达图' },
      },
    },
    {
      title: '创建用户',
      dataIndex: 'userId',
      valueType: 'text',
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
              content: '确定要删除该图表吗？此操作不可恢复！',
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
      <ProTable<API.ChartInfoV0>
        headerTitle="删除图表"
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
                message.warning('请选择要删除的图表');
                return;
              }
              Modal.confirm({
                title: '批量删除',
                content: `确定要删除选中的 ${selectedRowKeys.length} 个图表吗？此操作不可恢复！`,
                onOk: () => handleDelete(selectedRowKeys as string[]),
              });
            }}
          >
            批量删除
          </Button>,
        ]}
        request={async (params) => {
          const { current, pageSize, ...rest } = params;
          const result = await getAdminChartList({
            token: localStorage.getItem('token') ?? '',
            page: current,
            pageSize,
            ...rest,
          });
          return {
            data: result.data || [],
            success: result.success,
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

export default ChartDelete;
