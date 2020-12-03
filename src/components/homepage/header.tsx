import '../scss/homepage/header.scss'

import { Button, Card, Upload, message } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { getSignature, serverInfo } from '../../utils/upload';

import React from 'react';

const {Meta} = Card;

interface Props {
	module_data:{[key:string]:any}
}
const Component: React.FC<Props> = (props) => {

	const { module_data } = props;
	const { baseUrl,bucket,filePath } = serverInfo;

	const uploadProps = {
		name: 'file1',
		action: `${baseUrl}${bucket}${filePath}file1.jpg`,
		headers: {
			'Authorization': `UPYUN voyz:${getSignature('file1')}`,
			'Date': (new Date().toUTCString()),
		},
		// method:'PUT',
		onChange(info:any) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

  return (
    <div className='module_header'>
			{
				module_data.imgs && module_data.imgs.length>0 && module_data.imgs.map((r:any,i:number)=>{
					return (
						<Card
							style={{ width: 280,marginRight:10 }}
							cover={
								<img
									alt={'NO.'+(i+1)}
									src={r}
								/>
							}
							key={i}
							actions={[
								<Upload {...uploadProps} method={'put'}>
									<Button icon={<UploadOutlined />}>更换图片</Button>
								</Upload>,
								<DeleteOutlined key='delete'/>
							]}
						>
							<Meta
								title={`NO.${i+1}`}
								description={`第${i+1}张图片`}
							/>
						</Card>
					)
				})
			}
		</div>
  )
}

export default React.memo(Component);