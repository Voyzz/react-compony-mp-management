import '../../scss/components/slogan.scss'

import { Button, Form, Input, notification } from 'antd';
import React,{useState} from 'react';

import api from '../../api';

interface Props {
	module_data:{[key:string]:any},
	module_type:string
}
const Component: React.FC<Props> = (props) => {
    const { module_data,module_type } = props;
	const [currData, setCurrData] = useState(!!module_data ? module_data : {});
    const { slogan_title,slogan_subtitle,slogan_content } = currData;
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };

    const onFinish = (values:any) => {
        const {slogan} = values;
        const _module_data = slogan;

        // 请求接口
        api.HomepageModules({
            'pType':'update',
            'moduleType':module_type,
            'moduleData':_module_data
        }).then((res:any)=>{
            form.resetFields();
            console.log(res);

            // 刷新UI
            setCurrData(_module_data);
            const args = {
            message: '更新成功',
            description:
                `标语更新成功`,
            duration: 3,
            };
            notification.open(args);
        })
    };

	return (
		<div className='module_slogan'>
            <Form {...layout} name="nest-messages" onFinish={onFinish} style={{width:'100%'}} form={form} className="form_container">
                <Form.Item name={['slogan', 'slogan_title']} label="主标题">
                    <Input placeholder={`"${slogan_title}"`}/>
                </Form.Item>
                <Form.Item name={['slogan', 'slogan_subtitle']} label="副标题">
                    <Input  placeholder={`"${slogan_subtitle}"`}/>
                </Form.Item>
                <Form.Item name={['slogan', 'slogan_content']} label="内容">
                    <Input.TextArea  placeholder={`"${slogan_content}"`}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                    更新
                    </Button>
                </Form.Item>
            </Form>
		</div>
	)
}

export default React.memo(Component);