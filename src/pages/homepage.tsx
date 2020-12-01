import './scss/homepage.scss'

import {
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import ProLayout, {
  DefaultFooter,
  PageContainer,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';

import { Avatar } from 'antd';
import api from './app/api';

interface Props {}
const Component: React.FC<Props> = ({children}) => {

  useEffect(() => {
    // 请求接口
    api.HomepageModules({
      'position':3
    }).then((e)=>{
      console.log(e);
      setLoading(false);
    })
  }, [])

  const defaultProps = {
    route: {
      path: '/',
      routes: [
        {
          path: '/welcome',
          name: '欢迎',
          icon: <SmileOutlined />,
          component: './Welcome',
        },
        {
          path: '/admin',
          name: '模块配置',
          icon: <CrownOutlined />,
          access: 'canAdmin',
          component: './Admin',
          routes: [
            {
              path: '/admin/sub-page',
              name: '主页',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page2',
              name: '二级页面',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
            {
              path: '/admin/sub-page3',
              name: '三级页面',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
          ],
        },
        {
          name: '列表页',
          icon: <TabletOutlined />,
          path: '/list',
          component: './ListTableList',
          routes: [
            {
              path: '/list/sub-page',
              name: '一级列表页面',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
            {
              path: '/list/sub-page2',
              name: '二级列表页面',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
            {
              path: '/list/sub-page3',
              name: '三级列表页面',
              icon: <CrownOutlined />,
              component: './Welcome',
            },
          ],
        },
      ],
    },
    location: {
      pathname: '/',
    },
  }

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const menu = true;
  const header = true;
  const footer = true;
  const menuHeader = true;
  const right = true;
  const collapsedButtonRender = true;

  // const [menu, setMenu] = useState(true);
  // const [header, setHeader] = useState(true);
  // const [footer, setFooter] = useState(true);
  // const [menuHeader, setMenuHeader] = useState(true);
  // const [right, setRight] = useState(true);
  // const [collapsedButtonRender, setCollapsedButtonRender] = useState(true);

  return (
    <>
      <ProLayout
        {...defaultProps}
        style={{
          // height: 500,
          height:document.body.clientHeight
        }}
        logo={(
          <></>
        )}
        menuHeaderRender={menuHeader ? undefined : false}
        headerRender={header ? undefined : false}
        collapsedButtonRender={collapsedButtonRender ? undefined : false}
        menuRender={(_, dom) => (menu ? dom : null)}
        breakpoint={false}
        collapsed={collapsed}
        loading={loading}
        onCollapse={setCollapsed}
        rightContentRender={() =>
          right ? (
            <div style={{width:0,overflow: 'hidden',}}>
              <Avatar src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" />
            </div>
          ) : null
        }
        location={{
          pathname: '/welcome',
        }}
        footerRender={() => (footer ? <DefaultFooter /> : null)}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};

export default React.memo(Component);