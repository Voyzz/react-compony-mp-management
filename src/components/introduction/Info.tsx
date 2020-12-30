import '../../scss/components/info.scss'

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
        const {title,subtitle,content} = res;
        const _currDataList = {...currDataList};

        if(!!title) _currDataList.title = title;
        if(!!subtitle) _currDataList.subtitle = subtitle;
        if(!!content) _currDataList.content = content;

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
                <Form.Item name={['content']} label="简介内容">
                    <Input.TextArea placeholder={`"${currDataList.content}"`} autoSize={true}/>
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