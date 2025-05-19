import { postAdminUserCreate } from '@/services/txnbi/admin';
import { PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';

const UserAdd: React.FC = () => {
  const handleSubmit = async (values: API.AdminCreateUserReq) => {
    try {
      await postAdminUserCreate({ ...values, token: localStorage.getItem('token') ?? '' });
      message.success('添加用户成功');
      // 可以添加跳转到用户列表页面的逻辑
    } catch (error) {
      message.error('添加用户失败');
    }
  };

  return (
    <PageContainer>
      <ProForm
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: '添加用户',
          },
        }}
      >
        <ProFormText
          name="userAccount"
          label="用户名"
          placeholder="请输入用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText.Password
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码' }]}
        />
        <ProFormSelect
          name="userRole"
          label="用户角色"
          options={[
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
          ]}
          rules={[{ required: true, message: '请选择用户角色' }]}
        />
      </ProForm>
    </PageContainer>
  );
};

export default UserAdd;
