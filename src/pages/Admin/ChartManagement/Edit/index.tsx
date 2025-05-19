import { getAdminChartDetail, postAdminChartUpdate } from '@/services/txnbi/adminChart';
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';

const ChartEdit: React.FC = () => {
  const [initialValues, setInitialValues] = useState<API.ChartInfoV0>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chartId = searchParams.get('id');

  useEffect(() => {
    if (chartId) {
      getAdminChartDetail({ chartId })
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch(() => {
          message.error('获取图表信息失败');
        });
    }
  }, [chartId]);

  const handleSubmit = async (values: API.ChartUpdateRequest) => {
    if (!chartId) {
      message.error('图表ID不能为空');
      return;
    }

    try {
      await postAdminChartUpdate({
        ...values,
        chartId,
      });
      message.success('更新图表成功');
      // 可以添加跳转到图表列表页面的逻辑
    } catch (error) {
      message.error('更新图表失败');
    }
  };

  return (
    <PageContainer>
      {initialValues && (
        <ProForm
          initialValues={initialValues}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: '更新图表',
            },
          }}
        >
          <ProFormText
            name="name"
            label="图表名称"
            placeholder="请输入图表名称"
            rules={[{ required: true, message: '请输入图表名称' }]}
          />
          <ProFormSelect
            name="chartType"
            label="图表类型"
            options={[
              { label: '柱状图', value: 'bar' },
              { label: '折线图', value: 'line' },
              { label: '饼图', value: 'pie' },
              { label: '散点图', value: 'scatter' },
              { label: '雷达图', value: 'radar' },
            ]}
            rules={[{ required: true, message: '请选择图表类型' }]}
          />
          <ProFormTextArea
            name="description"
            label="图表描述"
            placeholder="请输入图表描述"
            rules={[{ required: true, message: '请输入图表描述' }]}
          />
          <ProFormTextArea
            name="chartData"
            label="图表数据"
            placeholder="请输入图表数据（JSON格式）"
            rules={[{ required: true, message: '请输入图表数据' }]}
          />
        </ProForm>
      )}
    </PageContainer>
  );
};

export default ChartEdit;
