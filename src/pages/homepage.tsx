import './hompage.css'

import { Avatar, Switch } from 'antd';
import {
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import ProLayout, {
  DefaultFooter,
  PageContainer,
} from '@ant-design/pro-layout';
import React, { useState } from 'react';

// import api from './app/api';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  // api.getHomepageData().then((e)=>{
  //   console.log(e)
  // })

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

  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [menu, setMenu] = useState(true);
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [menuHeader, setMenuHeader] = useState(true);
  const [right, setRight] = useState(true);
  const [pure, setPure] = useState(false);
  const [collapsedButtonRender, setCollapsedButtonRender] = useState(true);

  return (
    <>
      <Switch
        checked={loading}
        onChange={(e) => setLoading(e)}
        style={{
          margin: 8,
        }}
      />
      loading 状态
      <Switch
        checked={collapsed}
        onChange={(e) => setCollapsed(e)}
        style={{
          margin: 8,
        }}
      />
      折叠layout
      <Switch
        checked={menu}
        onChange={(e) => setMenu(e)}
        style={{
          margin: 8,
        }}
      />
      显示菜单
      <Switch
        checked={collapsedButtonRender}
        onChange={(e) => setCollapsedButtonRender(e)}
        style={{
          margin: 8,
        }}
      />
      显示折叠按钮
      <Switch
        checked={header}
        onChange={(e) => setHeader(e)}
        style={{
          margin: 8,
        }}
      />
      显示顶栏
      <Switch
        checked={menuHeader}
        onChange={(e) => setMenuHeader(e)}
        style={{
          margin: 8,
        }}
      />
      显示菜单头
      <Switch
        checked={footer}
        onChange={(e) => setFooter(e)}
        style={{
          margin: 8,
        }}
      />
      显示页脚
      <Switch
        checked={right}
        onChange={(e) => setRight(e)}
        style={{
          margin: 8,
        }}
      />
      显示顶栏右侧
      <Switch
        checked={pure}
        onChange={(e) => setPure(e)}
        style={{
          margin: 8,
        }}
      />
      清爽模式
      <br />
      <br />
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
        pure={pure}
        footerRender={() => (footer ? <DefaultFooter /> : null)}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};

export default React.memo(Component);