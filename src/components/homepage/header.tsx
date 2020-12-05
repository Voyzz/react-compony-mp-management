import '../scss/homepage/header.scss'

import { Button, Card, Upload, notification } from 'antd';
import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React,{useState} from 'react';

import api from '../../api';
import { uploadFile } from '../../utils/upload';

const {Meta} = Card;

interface Props {
	module_data:{[key:string]:any},
	module_type:string
}
const Component: React.FC<Props> = (props) => {

	const { module_data,module_type } = props;
	const [currData, setCurrData] = useState(!!module_data ? module_data : {});

	const exchangeImg = (res:any,i:number)=>{
		const {file} = res;
		const {name:fileName} = file;

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;
			if(!!Location) {
				const _currData = {...currData};
				_currData.imgs[i] = 'https://'+Location;
				rebuildData(_currData,{
					message: '上传成功',
					description:
						`图片更新成功`,
					duration: 3,
				});
			}
		})
	}

	const deleteImg = (i:number) => {
		const _currData = {...currData};
		const _imgs = _currData.imgs.filter((item:any,idx:number)=>{
			return idx !== i;
		});
		_currData.imgs = _imgs;
		rebuildData(_currData,{
			message: '删除成功',
			description:
				`图片删除成功`,
			duration: 3,
		});
	}

	const addImg = (res:any) => {
		const {file} = res;
		const {name:fileName} = file;

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;
			if(!!Location) {
				const _currData = {...currData};
				_currData.imgs.push('https://'+Location)
				rebuildData(_currData,{
					message: '添加成功',
					description:
						`图片添加成功`,
					duration: 3,
				});
			}
		})
	}

	const rebuildData = (_currData:any,args:any) => {
		// 请求接口
		api.HomepageModules({
			'pType':'update',
			'moduleType':module_type,
			'moduleData':_currData
		}).then((res:any)=>{
			console.log(res);
			// 刷新UI
			setCurrData(_currData);
			notification.open(args);
		})
	}

	return (
		<div className='module_header'>
				{
					currData.imgs && currData.imgs.length>0 && currData.imgs.map((r:any,i:number)=>{
						return (
							<Card
								style={{ width: 280,marginRight:20 }}
								cover={<img alt={'NO.'+(i+1)} src={r} style={{width: 280}}/>}
								key={i}
								actions={[
									<Upload
										customRequest={(res:any)=>{exchangeImg(res,i)}}
										showUploadList={false}
										>
										<Button icon={<UploadOutlined />} >更换图片</Button>
									</Upload>,
									<Button icon={<DeleteOutlined />} onClick={() => {deleteImg(i)}}>删除图片</Button>
								]}
							>
								<Meta title={`NO.${i+1}`}description={`第${i+1}张图片`}/>
							</Card>
						)
					})
				}
				<Upload
					name="avatar"
					listType="picture-card"
					showUploadList={false}
					customRequest={addImg}
				>
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>添加图片</div>
					</div>
				</Upload>
			</div>
	)
}

export default React.memo(Component);