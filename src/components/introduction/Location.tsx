import '../../scss/components/location.scss'

import { Button, Form, Input, Spin, notification } from 'antd';
import React,{useState} from 'react';

import api from '../../api';

interface Props {
	module_data:{[key:string]:any},
	module_type:string
}

const Component: React.FC<Props> = (props) => {
    const {module_data,module_type} = props;
    const [currDataList, setCurrDataList] = useState(!!module_data ? module_data : {});
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };

    const onFinish = (res:any) => {
        // const {title,data,content} = res.news;
        const {title,subtitle,mapPoint} = res;
        const _currDataList = {...currDataList};

        if(!!title) _currDataList.title = title;
        if(!!subtitle) _currDataList.subtitle = subtitle;
        if(!!mapPoint && !!mapPoint.longitude) _currDataList.mapPoint.longitude = mapPoint.longitude;
        if(!!mapPoint && !!mapPoint.latitude) _currDataList.mapPoint.latitude = mapPoint.latitude;
        if(!!mapPoint && !!mapPoint.label) _currDataList.mapPoint.label.content = mapPoint.label;

        rebuildData(_currDataList,{
            message: '更新',
            description:
                `更新成功`,
            duration: 3,
        });
    }

    const rebuildData = (_currData:any,args:any) => {
        setIsLoading(true);
		// 请求接口
		api.IntroductionModules({
			'pType':'update',
			'moduleType':module_type,
			'moduleData':_currData
		}).then((res:any)=>{
            setIsLoading(false);
            form.resetFields();
			console.log(res);
			// 刷新UI
			setCurrDataList(_currData);
			notification.open(args);
		})
	}


	return (
		<div className='module_news'>
            <Spin
                tip="Loading..."
                spinning={isLoading}
            >
            <Form {...layout} name="news-messages" onFinish={(res:any)=>{onFinish(res)}} style={{width:'100%'}} form={form}>
                <Form.Item name={['title']} label="标题">
                    <Input placeholder={`"${currDataList.title}"`}/>
                </Form.Item>
                <Form.Item name={['subtitle']} label="副标题">
                    <Input placeholder={`"${currDataList.subtitle}"`}/>
                </Form.Item>
                <div className="map_info" >
                    <Form.Item name={['mapPoint','longitude']} label="经度" labelCol={{span:4,offset:8}} wrapperCol={{span:15,offset:0}}>
                        <Input placeholder={`"${currDataList.mapPoint.longitude}"`}/>
                    </Form.Item>
                    <Form.Item name={['mapPoint','latitude']} label="纬度" labelCol={{span:4,offset:2}} wrapperCol={{span:15}}>
                        <Input placeholder={`"${currDataList.mapPoint.latitude}"`}/>
                    </Form.Item>
                </div>
                <Form.Item name={['mapPoint','label']} label="地图标签">
                    <Input placeholder={`"${currDataList.mapPoint.label.content}"`}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">更新</Button>
                </Form.Item>
            </Form>
            </Spin>
		</div>
	)
}

export default React.memo(Component);