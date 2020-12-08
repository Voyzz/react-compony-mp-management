import '../../scss/components/header.scss'

import { Button, Form, Input, notification } from 'antd';
import React,{useState} from 'react';

import api from '../../api';

interface Props {
	module_data:{[key:string]:any},
	module_type:{[key:string]:any}
}
const Component: React.FC<Props> = (props) => {
	const { module_data,module_type } = props;
  const [form] = Form.useForm();

  const [currData, setCurrData] = useState(module_data)

  // 更新搜索框占位词
  const onFinish = (values:any) => {
    let _module_data = {...module_data};
    if(!!values.placeholder){
      // 更新数据
      _module_data.placeholder = values.placeholder;

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
            `搜索框占位词更新为："${values.placeholder}"`,
          duration: 3,
        };
        openNotification(args);
      })
    }
  };

  // 通知提醒框
  const openNotification = (args:any) => {
    notification.open(args);
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
          <Input placeholder={`"${currData.placeholder}"`}/>
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

export default React.memo(Component);