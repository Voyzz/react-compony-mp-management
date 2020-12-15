import '@/scss/components/commodity.scss';

import { Button, Col, Divider, Drawer, Form, Input, List, Row, Select, Switch, Upload } from 'antd';
import { DeleteOutlined, PlusOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import api from '../api';
import { uploadFile } from '../utils/upload';

const { Option } = Select;


interface Props {}
let _selectOptinons:{[key:string]:any} = {
  'on_show':['线上商品','已下架','全部'],
  'class':[],
  'tags':[]
}
const Component: React.FC<Props> = ({children}) => {
  // ****************** Params ******************
  const [form] = Form.useForm();
  const _initObj:any = {};
  const _initArr:Array<any> = [];

  // ****************** States ******************
  const [currProList, setCurrProList] = useState([]);
  const [selectOptinons, setSelectOptinons] = useState(_selectOptinons);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currProData, setCurrProData] = useState(_initObj);
  const [currTagsList, setCurrTagsList] = useState(_initArr);
  const [currClassList, setCurrClassList] = useState(_initArr);
  const [currNewTagVal, setCurrNewTagVal] = useState("");
  const [currNewClassVal, setCurrNewClassVal] = useState("");
  const [submitText, setSubmitText] = useState("确定");
  const [currImageList, setcurrImageList] = useState(_initArr);
  const [currContent, setcurrContent] = useState("请输入产品简介");
  const [detailObj, setdetailObj] = useState(_initArr);
  const [detailArr, setdetailArr] = useState(_initArr);

  // ****************** Effect ******************
  useEffect(() => {
    // api.AddProduct(_testdata)

    api.GetProductList({
      is_show:1
    }).then((productList:any) => {
      // console.log(productList);

      let is_top_arr: any = [],un_top_arr:any = [];

      // 置顶项重拍
      productList.forEach((pro:any,idx:number) => {
        if(!!pro.is_top) is_top_arr.push(pro);
        else un_top_arr.push(pro)
      })

      // 构建筛选项
      productList.forEach((pro:any,idx:number) => {
        if(!!pro.class_list) {
          _selectOptinons.class = Array.from(new Set([..._selectOptinons.class,...pro.class_list]))
        }
        if(!!pro.tags_list) {
          _selectOptinons.tags = Array.from(new Set([..._selectOptinons.tags,...pro.tags_list]))
        }
      })

      const _productList = is_top_arr.concat(un_top_arr);

      console.log(_productList);


      setSelectOptinons(_selectOptinons);
      setCurrProList(_productList);
    })
  }, []);


  // ****************** 事件 ******************
  // 筛选项更新
  const handleChange = (val:any) => {
    console.log(`selected ${val}`);
  }

  // 打开抽屉
  const open_drawer = (pro:any,index:number,submit_text:string) => {
    form.resetFields();
    setCurrTagsList(!!pro.tags_list ? pro.tags_list : []);
    setCurrClassList(!!pro.class_list ? pro.class_list : []);
    setCurrProData(pro);

    // 图片列表处理
    if(pro.pro_image_list) {
      const _currImageList = pro.pro_image_list.map((img:any,idx:number) => {
        let _img = {...img};
        const img_name = _img.img_url.split('/');
        _img.uid = '-'+idx;
        _img.name = img_name[img_name.length-1];
        _img.status = 'done';
        _img.url = _img.img_url;
        return _img
      })
      setcurrImageList(_currImageList);
    }else{
      setcurrImageList([]);
    }

    console.log(pro);
    // 详情列表处理
    if(!!pro.pro_detail_list){
      pro.pro_detail_list.map((v:any,i:number) => {
        if(!!v.content) setcurrContent(v.content);
        if(!!v.detail_obj) setdetailObj(v.detail_obj);
        if(!!v.detail_arr) setdetailArr(v.detail_arr);
      })
    }else{
      setcurrContent('请输入产品简介');
      setdetailObj([]);
      setdetailArr([]);
    }

    setSubmitText(submit_text)
    setDrawerVisible(true);
  }

  // 添加新标签
  const add_new_tag = () => {

    let _currTagsList = [...currTagsList];
    _currTagsList.push(currNewTagVal)
    setCurrTagsList(_currTagsList);

    let _selectOptinons = {...selectOptinons};
    _selectOptinons.tags.push(currNewTagVal)
    setSelectOptinons(_selectOptinons);
  }

  // 添加新类别
  const add_new_class = () => {

    let _currClassList = [...currClassList];
    _currClassList.push(currNewClassVal)
    setCurrClassList(_currClassList);

    let _selectOptinons = {...selectOptinons};
    _selectOptinons.class.push(currNewClassVal)
    setSelectOptinons(_selectOptinons);
  }

  // 图片列表变化
  const image_list_change = (val:any) => {
    setcurrImageList(val.fileList);
  }

  // 添加图片
  const addImg = (res:any) => {
		const {file} = res;
		const {name:fileName} = file;

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;
			if(!!Location) {
				// const _currData = {...currData};
				// _currData.imgs.push('https://'+Location)
        let new_img:{[key:string]:any} = {
          'uid':'-'+currImageList.length,
          'name':fileName,
          'status':'done',
          'url':'https://'+Location
        }
        let _currImageList = [...currImageList];
        _currImageList.push(new_img);
        setcurrImageList(_currImageList);
			}
		})
	}

  // 删除详情参数
  const delete_detail_param = (idx:any) =>{
    console.log(idx);
    let _detailObj:any = detailObj.filter((v:any,i:number) => {
      return i !== idx
    })
    setdetailObj(_detailObj);
  }

  // 添加详情参数
  const add_detail_param = () => {
    let _detailObj = [...detailObj]
    _detailObj.push({
      key:'',
      value:''
    });
    setdetailObj(_detailObj);
  }

  // 删除用途
  const delete_detail_use = (idx:any) =>{
    console.log(idx);
    let _detailArr:any = detailArr.filter((v:any,i:number) => {
      return i !== idx
    })
    setdetailArr(_detailArr);
  }

  // 添加用途
  const add_detail_use = () => {
    let _detailArr = [...detailArr]
    _detailArr.push('');
    setdetailArr(_detailArr);
  }

  // 获取表单信息
  const get_form_data = (form_data:any) => {
    console.log(form_data);

    form.resetFields();
  }

  // ****************** 组件 ******************
  const drawer_content:any = () => {
    const {
      title,
      substitle,
      pro_number,
      class_list=[],
      pro_detail_list,
    } = currProData;

    return (
      <Form layout="vertical" hideRequiredMark form={form} onFinish={get_form_data}>
        {/* 第一行 */}
        <Row gutter={20}>
          {/* 产品名称 */}
          <Col span={4}>
            <Form.Item
              name="title"
              label="产品名称"
            >
              <Input placeholder={!!title ? title : '请输入产品名称'} />
            </Form.Item>
          </Col>
          {/* 副标题 */}
          <Col span={4}>
            <Form.Item
              name="substitle"
              label="副标题"
            >
              <Input placeholder={!!substitle ? substitle : '请输入副标题'} />
            </Form.Item>
          </Col>
          {/* 产品编号 */}
          <Col span={4}>
            <Form.Item
              name="pro_number"
              label="产品编号"
            >
              <Input placeholder={!!pro_number ? pro_number : '请输入产品编号'} />
            </Form.Item>
          </Col>
        </Row>

        {/* 第二行 */}
        <Row gutter={20}>
          {/* 标签列表 */}
          <Col span={4}>
            <Form.Item
              name="tags_list"
              label="标签"
              initialValue={currTagsList}
            >
              <Select
                mode="multiple"
                showArrow={true}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                      <Input style={{ flex: 'auto' }} value={currNewTagVal}  onChange={(e:any)=>{setCurrNewTagVal(e.target.value)}}/>
                      <Button type="primary" onClick={add_new_tag} >
                        <PlusOutlined /> 新标签
                      </Button>
                    </div>
                  </div>
                )}
              >
                {
                  selectOptinons.tags.map((res:any,idx:number)=>{
                    return (
                      <Option value={res} key={idx}>{res}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
          {/* 分类列表 */}
          <Col span={4}>
            <Form.Item
              name="class_list"
              label="分类"
              initialValue={class_list}
            >
              <Select
                mode="multiple"
                showArrow={true}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                      <Input style={{ flex: 'auto' }} value={currNewClassVal}  onChange={(e:any)=>{setCurrNewClassVal(e.target.value)}}/>
                      <Button type="primary" onClick={add_new_class} >
                        <PlusOutlined /> 新类别
                      </Button>
                    </div>
                  </div>
                )}
              >
                {
                  selectOptinons.class.map((res:any,idx:number)=>{
                    return (
                      <Option value={res} key={idx}>{res}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* 第三行 */}
        <Row gutter={20}>
          {/* 图片 */}
          <Col span={24}>
            <Form.Item
                name="pro_image_list"
                label="图片"
              >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={currImageList}
                onChange={image_list_change}
                customRequest={addImg}
              >
                {
                  currImageList.length >= 8 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )
                }
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* 第四行 */}
        <Row gutter={50}>
          {/* 产品简介 */}
          <Col span={6}>
            <Form.Item
                name={['pro_detail_list','content']}
                label="产品简介"
              >
                <Input.TextArea placeholder={currContent} autoSize={true}/>
            </Form.Item>
          </Col>
          {/* 产品参数 */}
          <Col span={6}>
            {
              !!detailObj && detailObj.length>0 && detailObj.map((v:any,i:number)=>{
                return (
                  <Row gutter={20} key={i}>
                    <Col span={6}>
                      <Form.Item
                        name={['pro_detail_list','detail_obj',i,'key']}
                        label={'参数名'}
                        initialValue={v.key}
                      >
                      <Input placeholder={v.key}/>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        name={['pro_detail_list','detail_obj',i,'value']}
                        label={'数值'}
                        initialValue={v.value}
                      >
                      <Input placeholder={v.value}/>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button danger style={{marginTop:30}} onClick={() => {delete_detail_param(i)}}>
                        删除参数
                      </Button>
                    </Col>
                  </Row>
                )
              })
            }
            <Row align='top' style={{marginTop: 0,}}>
              <Button type="primary" style={{marginTop:30}} onClick={add_detail_param}>
                添加参数
              </Button>
            </Row>
          </Col>
          {/* 主要用途 */}
          <Col span={6}>
            {
              !!detailArr && detailArr.length>0 && detailArr.map((v:any,i:number)=>{
                return (
                  <Row gutter={20} key={i}>
                    <Col span={10}>
                      <Form.Item
                        name={['pro_detail_list','detail_arr',i]}
                        label={i === 0 ? '用途' : ''}
                        initialValue={v}
                      >
                      <Input placeholder={v}/>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button danger style={{marginTop:i === 0 ? 30 : 0}} onClick={() => {delete_detail_use(i)}}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                )
              })
            }
            <Row align='top' style={{marginTop: 0,}}>
              <Button type="primary" style={{marginTop:30}} onClick={add_detail_use}>
                添加用途
              </Button>
            </Row>
          </Col>
        </Row>

        {/* 末行Button */}
        <Row justify="end">
          <Button type="primary" style={{ marginRight: 8 }} onClick={()=>{form.resetFields();setcurrImageList([])}} danger>
            清空
          </Button>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Row>
      </Form>
    )
  }

  return (
    <div className="commodity_container">
      {/****************** 筛选项 ******************/}
      <div className="select_container">
        <Select defaultValue="线上" className="select_box" onChange={handleChange}>
          {
            selectOptinons.on_show.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
        </Select>
        <Select defaultValue="分类" className="select_box" onChange={handleChange}>
          {
            selectOptinons.class.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
        </Select>
        <Select defaultValue="标签" className="select_box" onChange={handleChange}>
          {
            selectOptinons.tags.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
        </Select>
        {/* 添加产品 */}
        <div className="upload_box">
          <Button type="primary"  icon={<UploadOutlined />} onClick={()=>{open_drawer({},-1,'创建')}}>
            添加产品
          </Button>
        </div>
      </div>

      {/****************** 产品列表 ******************/}
      <div className="pro_list_container">
        <List
          className="pro_list"
          loading={false}
          itemLayout="horizontal"
          dataSource={currProList}
          renderItem={(pro:any,index:number) => (
            <List.Item
              actions={[
                <Switch checkedChildren="已置顶" unCheckedChildren="未置顶" defaultChecked={pro.is_top} />,
                <Button type="primary" shape="round" icon={<UnorderedListOutlined />} size="small" ghost onClick={()=>{open_drawer(pro,index,'修改')}}>
                  详情 / 修改
                </Button>,
                <Button type="primary" shape="round" icon={<DeleteOutlined />} size="small" danger>
                  删除
                </Button>,
                <Switch checkedChildren="上线" unCheckedChildren="下线" defaultChecked={pro.is_show} />
              ]}
            >
              <List.Item.Meta
                title={pro.title}
                description={pro.substitle}
              />
            </List.Item>
          )}
        />
      </div>

      {/****************** 抽屉 ******************/}
      <Drawer
        title="产品信息"
        width={750}
        height={750}
        onClose={()=>{setDrawerVisible(false);setdetailObj([])}}
        placement="top"
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {drawer_content()}
      </Drawer>

    </div>
  )
}

export default React.memo(Component);