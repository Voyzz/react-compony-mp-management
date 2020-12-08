import '@/scss/components/banner.scss';

import { Button, Image, Spin, Upload, notification } from 'antd';
import React,{useState} from 'react';

import api from '../../api';
import fallbackImg from '../../assets/fallbackImg';
import { uploadFile } from '../../utils/upload';

interface Props {
	module_data:{[key:string]:any},
	module_type:{[key:string]:any}
}
const Component: React.FC<Props> = (props) => {
    const {module_data,module_type} = props;

    const [currDataList, setCurrDataList] = useState(!!module_data ? module_data : {});
    const [isLoading, setIsLoading] = useState(false)

    const exchangeImg = (res:any) => {
        const {file} = res;
		const {name:fileName} = file;

        setIsLoading(true);

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;

            setIsLoading(false);

			if(!!Location) {
                const _currDataList = {...currDataList};
                _currDataList.intro_banner = 'https://'+Location;

                setIsLoading(true);
                // 请求接口
                api.IntroductionModules({
                    'pType':'update',
                    'moduleType':module_type,
                    'moduleData':_currDataList
                }).then((res:any)=>{
                    setIsLoading(false);
                    console.log(res);

                    // 刷新UI
                    setCurrDataList(_currDataList);

                    notification.open({
                        message: '更换',
                        description:
                            `图片更换成功`,
                        duration: 3,
                    });
                })
			}
		})
    }

	return (
		<div className='module_banner'>
            <Spin
                tip="Loading..."
                spinning={isLoading}
            >
                <Image
                    width={'20vw'}
                    src={currDataList.intro_banner}
                    fallback={fallbackImg()}
                />
                <Upload showUploadList={false} customRequest={(res:any)=>{exchangeImg(res)}}>
                    <Button style={{width:'20vw',position:'absolute',left:0,bottom:0,backgroundColor:'#00000030',color:'#FFf',fontWeight:'bold'}}>更换图片</Button>
                </Upload>
            </Spin>
		</div>
	)
}

export default React.memo(Component);