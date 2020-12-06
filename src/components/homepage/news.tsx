import '../../scss/conponents/news.scss'

import React from 'react';

interface Props {
	module_data:{[key:string]:any},
	module_type:string
}
interface Props {}
const Component: React.FC<Props> = (props) => {

	return (
		<div className='module_news'>
            至商品页配置
		</div>
	)
}

export default React.memo(Component);