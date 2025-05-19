import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright={false}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <div>{/* <GithubOutlined /> 后端源码 */}</div>,
          href: 'https://github.com/txn1007/txnbi-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
