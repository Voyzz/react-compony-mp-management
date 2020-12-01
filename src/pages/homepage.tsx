import './scss/homepage.scss';

import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect } from 'react';

import api from './app/api';
import homepageConfig from './config';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


interface Props {}
const Component: React.FC<Props> = ({children}) => {

  useEffect(() => {
    // 请求接口
    api.HomepageModules({
      'position':3
    }).then((e)=>{
      console.log(homepageConfig);
    })
  }, [])

	const { header:_header,sider:_sider } = homepageConfig;
  return (
    <>
    <Layout className="container">
			{/* Header */}
      <Header className="header">
        <Menu theme={_header.theme} mode="horizontal" defaultSelectedKeys={['2']}>
          {
            _header.titleList.map((r:string,i:number)=>{
              return (
                <Menu.Item key="i">{r}</Menu.Item>
              )
            })
          }
        </Menu>
      </Header>
			{/* Sider */}
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
						{
							_sider.subMenuList.map((r:any,i:number)=>{
								return (
									<SubMenu key={r.key} icon={<r.icon />} title={r.title}>
										{
											r.itemList.map((item:any,idx:number)=>{
												return (
													<Menu.Item key={item.key}>{item.subtitle}</Menu.Item>
												)
											})
										}
									</SubMenu>
								)
							})
						}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </>
  );
};

export default React.memo(Component);