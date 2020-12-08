import '../scss/components/homepage.scss';

import { Collapse, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import Goods from './homepage/goods';
import Header from './homepage/header';
import News from './homepage/news';
import Search from './homepage/search';
import Slogan from './homepage/slogan';
import api from '../api';

const { Panel } = Collapse;

const _titleList:{[key:string]:string} = {
  'header':'轮播图',
  'search':'搜索框',
  'goods':'商品轮播',
  'slogan':'标语',
  'news':'新闻'
}

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  const [currModuleData, setCurrModuleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  // ----------------- Efect -----------------
  useEffect(() => {
    setIsLoading(true);
    // 请求接口
    api.HomepageModules({}).then((res:any)=>{
      setCurrModuleData(res);
      setIsLoading(false);
      // console.log(res);
    })
  }, []);

  const renderModules = (_module:{[key:string]:any},idx:number) => {
    const { module_type,module_data } = _module;
    // Header
    if(module_type === 'header'){
      return (
        <Header module_data={module_data} module_type={module_type}/>
      )
    }

    // Search
    else if(module_type === 'search'){
      return (
        <Search module_data={module_data} module_type={module_type} />
      )
    }

    // Goods
    else if(module_type === 'goods'){
      return (
        <Goods />
      )
    }

    // Slogan
    else if(module_type === 'slogan'){
      return (
        <Slogan module_data={module_data} module_type={module_type} />
      )
    }

    // Slogan
    else if(module_type === 'news'){
      return (
        <News module_data={module_data} module_type={module_type} />
      )
    }
  }

  return (
    <div className="container" style={{width:'81vw',paddingTop:'2vw',margin:0}}>
    <Spin spinning={isLoading} delay={500}>
      <Collapse
        style={{ fontSize:16,backgroundColor: '#fff',width:'80.1vw',margin:0 }}
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
    </Spin>
    </div>
  )
}

export default React.memo(Component);