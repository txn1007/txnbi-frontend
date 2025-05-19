import { postAdminChartUpdate } from '@/services/txnbi/adminChart';
import { PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

const ChartAdd: React.FC = () => {
  const handleSubmit = async (values: API.ChartCreateReq) => {
    try {
      await postAdminChartUpdate({ ...values, token: localStorage.getItem('token') ?? '' });
      message.success('添加图表成功');
      // 可以添加跳转到图表列表页面的逻辑
    } catch (error) {
      message.error('添加图表失败');
    }
  };

  return (
    <PageContainer>
      <ProForm
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: '添加图表',
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
      </ProForm>
    </PageContainer>
  );
};

export default ChartAdd;
