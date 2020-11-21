import React from 'react';
import './hompage.css'

import { Button } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

interface Props {}
const Component: React.FC<Props> = ({children}) => {

  return (
    <ProLayout>
    <PageContainer
      extra={[
        <Button key="3">Operating</Button>,
        <Button key="2">Operating</Button>,
        <Button key="1" type="primary">
          Main Operating
        </Button>,
      ]}
      footer={[<Button>reset</Button>, <Button type="primary">submit</Button>]}
    >
      {children}
    </PageContainer>
  </ProLayout>
  );
};

export default React.memo(Component);