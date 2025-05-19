import { getAdminUserDetail, postAdminUserUpdate } from '@/services/txnbi/admin';
import { PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';

const UserEdit: React.FC = () => {
  const [initialValues, setInitialValues] = useState<API.UserInfoV0>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  useEffect(() => {
    if (userId) {
      getAdminUserDetail({ userId: userId })
        .then((response) => {
          setInitialValues(response.user);
        })
        .catch(() => {
          message.error('获取用户信息失败');
        });
    }
  }, [userId]);

  const handleSubmit = async (values: API.UserUpdateRequest) => {
    if (!userId) {
      message.error('用户ID不能为空');
      return;
    }

    try {
      await postAdminUserUpdate({
        ...values,
        userID: userId,
      });
      message.success('更新用户成功');
      // 可以添加跳转到用户列表页面的逻辑
    } catch (error) {
      message.error('更新用户失败');
    }
  };

  return (
    <PageContainer>
      <Card>
        {initialValues && (
          <ProForm
            initialValues={initialValues}
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: '更新用户',
              },
            }}
          >
            <ProFormText
              name="userName"
              label="用户名"
              placeholder="请输入用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            />
            <ProFormSelect
              name="userRole"
              label="用户角色"
              options={[
                { label: '管理员', value: 'admin' },
                { label: '普通用户', value: 'user' },
                { label: '访客', value: 'visitor' },
              ]}
              rules={[{ required: true, message: '请选择用户角色' }]}
            />
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default UserEdit;
