import '@/scss/components/introduction.scss'

import { Collapse, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import Banner from '../components/introduction/Banner';
import Info from '../components/introduction/Info';
import Location from '../components/introduction/Location';
import api from '../api';

const { Panel } = Collapse;

const _titleList:{[key:string]:string} = {
  'banner':'头图',
  'location':'地图定位',
  'info':'公司简介',
}

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  const [currModuleData, setCurrModuleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  // ----------------- Efect -----------------
  useEffect(() => {
    setIsLoading(true);
    // 请求接口
    api.IntroductionModules({}).then((res:any)=>{
      setCurrModuleData(res);
      setIsLoading(false);
      // console.log(res);
    })
  }, []);

  const renderModules = (_module:{[key:string]:any},idx:number) => {
    const { module_type,module_data } = _module;
    // Banner
    if(module_type === 'banner'){
      return (
        <Banner module_data={module_data} module_type={module_type}/>
      )
    }
    // Location
    if(module_type === 'location'){
      return (
        <Location module_data={module_data} module_type={module_type}/>
      )
    }
    // Info
    if(module_type === 'info'){
      return (
        <Info module_data={module_data} module_type={module_type}/>
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