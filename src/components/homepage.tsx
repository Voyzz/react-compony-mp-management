import './scss/homepage.scss';

import { Button, Card, Collapse, Form, Input, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import Header from './homepage/header';
import api from '../api';

const { Panel } = Collapse;
const {Meta} = Card;

const _titleList:{[key:string]:string} = {
  'header':'轮播图',
  'search':'搜索框',
  'goods':'商品轮播',
  'slogan':'标语',
  'news':'新闻'
}

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  const [form] = Form.useForm();
  const [currModuleData, setCurrModuleData] = useState([]);
  const [reFetchApi, setReFetchApi] = useState(0)

  // ----------------- Efect -----------------
  useEffect(() => {
    // 请求接口
    api.HomepageModules({}).then((res:any)=>{
      setCurrModuleData(res);
      console.log(res);
    })
  }, [reFetchApi]);

  // 通知提醒框
  const openNotification = (args:any) => {
    notification.open(args);
  };

  const renderModules = (_module:{[key:string]:any},idx:number) => {
    const { module_type,module_data } = _module;
    // Header
    if(module_type === 'header'){
      return (
        <Header module_data={module_data} />
      )
    }

    // Search
    else if(module_type === 'search'){

      // 更新搜索框占位词
      const onFinish = (values:any) => {
        let _module_data = {...module_data};
        if(!!values.placeholder){
          _module_data.placeholder = values.placeholder;
          api.HomepageModules({
            'pType':'update',
            'moduleType':module_type,
            'moduleData':_module_data
          }).then((res:any)=>{
            form.resetFields();
            console.log(res);

            const args = {
              message: '更新成功',
              description:
                `搜索框占位词更新为："${values.placeholder}"`,
              duration: 5000,
            };
            openNotification(args);

            setReFetchApi(reFetchApi+1)
          })
        }
      };

      return (
        <div className='module_search'>
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              label="更改搜索框占位词"
              style={{height:20}}
            >
            </Form.Item>
            <Form.Item
              name="placeholder"
              rules={[{ required: true }]}
              style={{width:400}}
            >
              <Input placeholder={`"${module_data.placeholder}"`}/>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) => {
                return getFieldValue('gender') === 'other' ? (
                  <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    }

    
  }

  return (
    <div className="container">
      <Collapse
        style={{ width:'80%', fontSize:16 }}
        defaultActiveKey={[]}
        bordered={false}
        className="site-collapse-custom-collapse"
        >
        {
          currModuleData.length>0 && currModuleData.map((_module:{[key:string]:any},idx:number)=>{
            const { module_type } = _module;
            return (
              <Panel
                className="site-collapse-custom-panel"
                key={idx} header={_titleList[module_type]}
                >
                <>
                {renderModules(_module,idx)}
                </>
              </Panel>
            )
          })
        }
      </Collapse>
    </div>
  )
}

export default React.memo(Component);