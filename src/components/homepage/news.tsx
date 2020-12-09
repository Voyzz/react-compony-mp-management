import '../../scss/components/news.scss'

import { Button, Collapse, Form, Image, Input, Popconfirm, Spin, Upload, notification } from 'antd';
import React,{useState} from 'react';

import api from '../../api';
import fallbackImg from '../../assets/fallbackImg';
import { uploadFile } from '../../utils/upload';

const { Panel } = Collapse;

interface Props {
	module_data:{[key:string]:any},
	module_type:string
}

let newCoverImg = '';
const Component: React.FC<Props> = (props) => {
    const {module_data,module_type} = props;
    const [currDataList, setCurrDataList] = useState(!!module_data ? module_data : {});
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };

    const onFinish = (res:any,idx:number) => {
        const {title,data,content} = res.news;
        const _currDataList = {...currDataList};

        // 新增
        if(idx===-1){
            let _newItem:{[key:string]:any} = {};

            _newItem.title = !!title ? title : '新闻标题';
            _newItem.data = !!data ? data : '1993-12-27';
            _newItem.content = !!content ? content : '新闻内容';
            _newItem.coverImg = newCoverImg;

            const _currDataList = {...currDataList};
            _currDataList.news_list.unshift(_newItem);

            rebuildData(_currDataList,{
                message: '新增',
                description:
                    `新闻新增成功`,
                duration: 3,
            });
        }
        // 更新
        else{
            const _currNewsItem = _currDataList.news_list[idx];

            if(!!title) _currNewsItem.title = title;
            if(!!data) _currNewsItem.data = data;
            if(!!content) _currNewsItem.content = content;

            rebuildData(_currDataList,{
                message: '更新',
                description:
                    `新闻更新成功`,
                duration: 3,
            });
        }
    }

    const deleteNewsItem = (idx:number) => {
        const _currDataList = {...currDataList};
        const _news_list = _currDataList.news_list.filter((item:any,_idx:number)=>{
            return _idx !== idx;
        })
        _currDataList.news_list = _news_list;

        rebuildData(_currDataList,{
            message: '删除',
            description:
                `新闻删除成功`,
            duration: 3,
        });
    }

    const addImg = (res:any,idx:number) => {
        const {file} = res;
		const {name:fileName} = file;

        setIsLoading(true);

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;

            setIsLoading(false);

			if(!!Location) {
                // 新增
                if(idx === -1){
                    newCoverImg = 'https://'+Location;
                }
                // 更新
                else{
                    const _currDataList = {...currDataList};
                    _currDataList.news_list[idx].coverImg = 'https://'+Location;
                    rebuildData(_currDataList,{
                        message: '更换',
                        description:
                            `图片更换成功`,
                        duration: 3,
                    });
                }
			}
		})
    }

    const rebuildData = (_currData:any,args:any) => {
        setIsLoading(true);
		// 请求接口
		api.HomepageModules({
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

    let _renderList = [...currDataList.news_list];

    _renderList.unshift({
        content: "请输入新闻内容",
        coverImg: "",
        data: "示例: 2020-12-27",
        title: "请输入新闻标题"
    })

	return (
		<div className='module_news'>
            <Spin
                tip="Loading..."
                spinning={isLoading}
            >
            <Collapse
                accordion={true}
                // ghost={true}
                >
                {
                    _renderList.map((panel:any,idx:number) => {
                        const {title,data,content,coverImg} = panel
                        return (
                            <Panel 
                                header={idx === 0 ? (
                                    <Button type="primary" style={{marginLeft:'1vw'}}>添加新闻</Button>
                                ) : panel.title}
                                key={idx}
                                showArrow={idx === 0 ? false:true}
                                >
                                <Form {...layout} name="news-messages" onFinish={(res:any)=>{onFinish(res,idx-1)}} className="form_container" form={form}>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                                        <Image
                                            width={'8vw'}
                                            src={idx===0 ? newCoverImg : coverImg}
                                            fallback={fallbackImg()}
                                        />
                                        <Upload showUploadList={false} customRequest={(res:any)=>{addImg(res,idx-1)}}>
                                            <Button type="dashed" className="upload_button">{idx===0?'添加图片':'更换'}</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item name={['news', 'title']} label="标题">
                                        <Input placeholder={`"${title}"`}/>
                                    </Form.Item>
                                    <Form.Item name={['news', 'data']} label="日期">
                                        <Input placeholder={`"${data}"`}/>
                                    </Form.Item>
                                    <Form.Item name={['news', 'content']} label="新闻内容">
                                        <Input.TextArea  placeholder={`"${content}"`}  autoSize={true}/>
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                                        <Button type="primary" htmlType="submit">
                                        {idx===0 ? '提交' : '更新'}
                                        </Button>
                                        {
                                            idx!==0 && <Popconfirm
                                                            title="确定删除新闻?"
                                                            onConfirm={()=>{deleteNewsItem(idx-1)}}
                                                            onCancel={()=>{}}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                <Button type="primary" style={{marginLeft:10}} danger>删除</Button>
                                            </Popconfirm>
                                        }
                                    </Form.Item>
                                </Form>
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