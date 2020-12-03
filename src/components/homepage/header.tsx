import '../scss/homepage/header.scss'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import React from 'react';

const {Meta} = Card;

interface Props {
	module_data:{[key:string]:any}
}
const Component: React.FC<Props> = (props) => {

	// const module_data:Props
	const { module_data } = props;


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
								<EditOutlined key="edit" />,
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