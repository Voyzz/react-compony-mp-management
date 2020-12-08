import '../scss/pages/Admin.scss';

import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';

import Commodity from '../components/commodity';
import ErrorPage from './Error';
import Homeland from '../components/homeland';
import Homepage from '../components/homepage';
import Introduction from '../components/introduction';
import adminConfig from '../config/adminPageConfig';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


interface Props {}
const Component: React.FC<Props> = ({children}) => {
  const { header:_header,sider:_sider } = adminConfig;

  // ----------------- State -----------------
  const [breadcrumb, setBreadcrumb] = useState([
    _header.titleList[0],
    _sider.subMenuList[0].title,
    _sider.subMenuList[0].itemList[0].subtitle
  ]);


  // ----------------- Reducer -----------------
  const contentReducer = (state:any,action:any) => {
    switch (action.key) {
      case '0_0':
        return (<Homepage />);
      case '0_1':
        return (<Introduction />);
      case '0_2':
        return (<Commodity />);
      case '0_3':
        return (<Homeland />);
      default:
        return (<ErrorPage />);
    }
  }
  const [contentState, dispatch] = useReducer(contentReducer, (<Homepage />))

  // ----------------- Efect -----------------
  useEffect(() => {
  }, []);

  const onMenuItemSelected = (item:any) => {
    const { key='0_0' } = item,
      _subArr = key.split('_');

    dispatch({key})

    setBreadcrumb([
      _header.titleList[0],
      _sider.subMenuList[_subArr[0]].title,
      _sider.subMenuList[_subArr[0]].itemList[_subArr[1]].subtitle
    ])
    // console.log(item);
  }

  return (
    <>
    <Layout className="container">
			{/* Header */}
      <Header className="header">
        <Menu theme={_header.theme} mode="horizontal" defaultSelectedKeys={['2']}>
          {
            _header.titleList.map((r:string,i:number)=>{
              return (
                <Menu.Item key={i}>{r}</Menu.Item>
              )
            })
          }
        </Menu>
      </Header>
			{/* Sider */}
      <Layout style={{height:'100vh'}}>
        <Sider width={'15vw'} className="sider-site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['0_0']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0,fontSize:16 }}
          >
						{
							_sider.subMenuList.map((r:any,i:number)=>{
								return (
									<SubMenu key={r.key} icon={<r.icon />} title={r.title}>
										{
											r.itemList.map((item:any,idx:number)=>{
												return (
													<Menu.Item
                            key={item.key}
                            style={{ fontSize:14 }}
                            onClick={onMenuItemSelected}
                          >
                            {item.subtitle}
                          </Menu.Item>
												)
											})
										}
									</SubMenu>
								)
							})
						}
          </Menu>
        </Sider>
        {/* Content */}
        <Layout style={{ padding: '0 2vw 2vw',width:'85vw' }}>
          <Breadcrumb style={{ margin: '16px 0',width:'85vw' }}>
            {
              breadcrumb.map((r:string,i:number)=>{
                return (
                  <Breadcrumb.Item key={i}>{r}</Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
          <Content className="content-site-layout-background">
            {contentState}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </>
  );
};

export default React.memo(Component);