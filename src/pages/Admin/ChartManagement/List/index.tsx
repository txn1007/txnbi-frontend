import { getAdminChartList } from '@/services/txnbi/adminChart';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const ChartList: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
  ];

  return (
    <PageContainer>
      <ProTable<API.ChartInfoV0>
        headerTitle="图表查询"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
      />
    </PageContainer>
  );
};

export default ChartList;
