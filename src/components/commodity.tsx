import '@/scss/components/commodity.scss';

import { Button, Col, Divider, Drawer, Form, Image, Input, List, Popconfirm, Row, Select, Switch, Upload, message } from 'antd';
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
  // ************************************ Params ************************************
  const [form] = Form.useForm();
  const _initObj:any = {};
  const _initArr:Array<any> = [];

  const [currProList, setCurrProList] = useState([]);                           //当前产品列表
  const [selectOptinons, setSelectOptinons] = useState(_selectOptinons);        //删选项
  const [drawerVisible, setDrawerVisible] = useState(false);                    //显示抽屉
  const [currProData, setCurrProData] = useState(_initObj);                     //当前选中产品数据
  const [currTagsList, setCurrTagsList] = useState(_initArr);                   //选中产品标签列表
  const [currClassList, setCurrClassList] = useState(_initArr);                 //选中产品类别列表
  const [currNewTagVal, setCurrNewTagVal] = useState("");                       //新添加标签
  const [currNewClassVal, setCurrNewClassVal] = useState("");                   //新添加类别
  const [submitText, setSubmitText] = useState("确定");                          //按钮文案
  const [currImageList, setcurrImageList] = useState(_initArr);                 //选中产品图片列表
  const [currContent, setcurrContent] = useState("");                           //选中产品简介内容
  const [detailObj, setdetailObj] = useState(_initArr);                         //选中产品参数数据
  const [detailArr, setdetailArr] = useState(_initArr);                         //选中产品用途数据
  const [currPriceList, setcurrPriceList] = useState(_initArr);                 //选中产品价格数据
  const [showSelect, setshowSelect] = useState(false);                          //显示标签选择框
  const [currFilterParams, setcurrFilterParams] = useState(_initObj)            //当前筛选参数
  const [showProList, setshowProList] = useState(false)                         //显示产品列表

  // ************************************ Effect ************************************
  useEffect(() => {
    _getProductList({})
  }, []);

  // ************************************ 公共方法 ************************************
  // 数据过滤
  const formate_data = (_init_data:any) => {
    let formated_data:any = {};
    let _key:string;
    for(_key in _init_data){
      if(!!_init_data[_key]) formated_data[_key] = _init_data[_key];
    }
    return formated_data;
  }
  // 数据查询与重构
  const _getProductList = (params:any) => {
    setshowProList(false);
    api.GetProductList(params).then((productList:any) => {
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

      setSelectOptinons(_selectOptinons);
      setCurrProList(_productList);
      setshowProList(true);
    })
  }
  // 初始化数据
  const init_state = () => {
    setDrawerVisible(false);
    setdetailObj([]);
    setCurrTagsList([]);
    setCurrClassList([]);
    setshowSelect(false);
    setcurrContent("");
  }

  // ************************************ 事件 ************************************
  // ------ 获取表单信息 ------
  const get_form_data = (form_data:any) => {

    // --- 数据重构 ---
    let pre_update_data = {...formate_data(form_data)};

    pre_update_data.pro_image_list = JSON.stringify({
      list:currImageList
    })
    pre_update_data.class_list = JSON.stringify({
      list:pre_update_data.class_list
    })
    pre_update_data.tags_list = JSON.stringify({
      list:pre_update_data.tags_list
    })
    pre_update_data.price_list = JSON.stringify({
      list:!!pre_update_data.price_list ? pre_update_data.price_list : []
    })
    let _key:string;
    let _list:Array<any> = [];
    for(_key in pre_update_data.pro_detail_list){
      switch (_key) {
        case 'content':
          _list.push({
            type:'info',
            name:'产品简介',
            content:pre_update_data.pro_detail_list.content
          })
          break;
        case 'detail_obj':
          _list.push({
            type:'info',
            name:'产品参数',
            detail_obj:JSON.stringify({
              list:pre_update_data.pro_detail_list.detail_obj
            })
          })
          break;
        case 'detail_arr':
          _list.push({
            type:'info',
            name:'主要用途',
            detail_arr:JSON.stringify({
              list:pre_update_data.pro_detail_list.detail_arr
            })
          })
          break;
      }
    }
    pre_update_data.pro_detail_list = JSON.stringify({list:_list});
    // --- 数据重构 end ---

    switch (submitText) {
      case '创建':
        api.AddProduct(pre_update_data).then((res:any)=>{
          console.log(res);
          message.success('创建成功');
          init_state();
          _getProductList({});
        })
        break;
      case '修改':
        api.UpdateProduct({
          ...pre_update_data,
          pro_id:currProData.pro_id
        }).then((res:any)=>{
          message.success('修改成功');
          init_state();
          _getProductList({});
        })
        break;
    }

    // 数据处理
    form.resetFields();
  }

  // 删除产品
  const delete_product = (pro:any) => {
    api.DeleteProduct({pro_id:pro.pro_id}).then(()=>{
      message.success('删除成功');
      _getProductList({});
    });
  }

  // ------ 筛选项更新 ------
  const handleChange = (type:string,val:any) => {
    let _currFilterParams = {...currFilterParams}
    switch (type) {
      case 'is_show':
        switch (val) {
          case '全部':
            if(!!_currFilterParams.is_show) delete _currFilterParams.is_show;
            break;
          case '线上商品':
            _currFilterParams.is_show = 1;
            break;
          case '已下架':
            _currFilterParams.is_show = 0;
            break;
        }
        break;
      case 'tags_reg':
        if(val === '') delete _currFilterParams.tags_reg;
        else _currFilterParams.tags_reg = val
        break;
      case 'class_reg':
        if(val === '') delete _currFilterParams.class_reg;
        else _currFilterParams.class_reg = val
        break;
    }
    setcurrFilterParams(_currFilterParams);
    _getProductList(_currFilterParams)
  }

  // ------ 打开抽屉 ------
  const open_drawer = (pro:any,index:number,submit_text:string) => {

    setCurrProData(pro);

    form.resetFields();

    // 标签分类处理
    setCurrTagsList(!!pro.tags_list ? pro.tags_list : []);
    setCurrClassList(!!pro.class_list ? pro.class_list : []);

    setTimeout(() => {
      setshowSelect(true);
    }, 500);

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

    // 详情列表处理
    if(!!pro.pro_detail_list){
      pro.pro_detail_list.forEach((v:any,i:number) => {
        if(!!v.content) {
          setcurrContent(v.content);
          form.setFieldsValue({
            pro_detail_list:{
                content:v.content
            }
          })
        }
        if(!!v.detail_obj) {
          setdetailObj(v.detail_obj);
          form.setFieldsValue({
            pro_detail_list:{
                detail_obj:v.detail_obj.map((r:any) => {
                  return {
                    key:r.key,
                    value:r.value
                  }
                })
            }
          })
        }
        if(!!v.detail_arr) {
          setdetailArr(v.detail_arr);
          form.setFieldsValue({
            pro_detail_list:{
                detail_arr:v.detail_arr
            }
          })
        }
      })
    }else{
      setcurrContent('');
      setdetailObj([]);
      setdetailArr([]);
    }

    // 价格列表处理
    if(!!pro.price_list){
      setcurrPriceList(pro.price_list);
      form.setFieldsValue({
        price_list:pro.price_list.map((r:any) => {
          return {
            price:r.price,
            date:r.date,
            currency:r.currency,
            unit:r.unit
          }
        })
      })
    }else{
      setcurrPriceList([]);
    }

    setSubmitText(submit_text)
    setDrawerVisible(true);
  }

  // ------ 添加新标签 ------
  const add_new_tag = () => {

    let _currTagsList = [...currTagsList];
    _currTagsList.push(currNewTagVal)
    setCurrTagsList(_currTagsList);

    let _selectOptinons = {...selectOptinons};
    _selectOptinons.tags.push(currNewTagVal)
    setSelectOptinons(_selectOptinons);
  }

  // ------ 添加新类别 ------
  const add_new_class = () => {

    let _currClassList = [...currClassList];
    _currClassList.push(currNewClassVal)
    setCurrClassList(_currClassList);

    let _selectOptinons = {...selectOptinons};
    _selectOptinons.class.push(currNewClassVal)
    setSelectOptinons(_selectOptinons);
  }

  // ------ 图片列表变化 ------
  const image_list_change = (val:any) => {
    setcurrImageList(val.fileList);
  }

  // ------ 添加图片 ------
  const addImg = (res:any) => {
		const {file} = res;
		const {name:fileName} = file;

		uploadFile(file,fileName,(data:any)=>{
			const {Location} = data;
			if(!!Location) {
        let new_img:{[key:string]:any} = {
          'uid':'-'+currImageList.length,
          'name':fileName,
          'status':'done',
          'img_url':'https://'+Location,
          'url':'https://'+Location,
        }
        let _currImageList = [...currImageList];
        _currImageList.push(new_img);
        setcurrImageList(_currImageList);
			}
		})
	}

  // ------ 删除详情参数 ------
  const delete_detail_param = (idx:any) =>{
    let _detailObj:any = detailObj.filter((v:any,i:number) => {
      return i !== idx
    })
    setdetailObj(_detailObj);
  }

  // ------ 添加详情参数 ------
  const add_detail_param = () => {
    let _detailObj = [...detailObj]
    _detailObj.push({
      key:'',
      value:''
    });
    setdetailObj(_detailObj);
  }

  // ------ 删除用途 ------
  const delete_detail_use = (idx:any) =>{
    console.log(idx);
    let _detailArr:any = detailArr.filter((v:any,i:number) => {
      return i !== idx
    })
    setdetailArr(_detailArr);
  }

  // ------ 添加用途 ------
  const add_detail_use = () => {
    let _detailArr = [...detailArr]
    _detailArr.push('');
    setdetailArr(_detailArr);
  }

  // ------ 添加价格 ------
  const add_price = () => {
    let _currPriceList = [...currPriceList]
    _currPriceList.push({
      price:'',
      date:'',
      currency:'',
      unit:''
    });
    setcurrPriceList(_currPriceList);
  }

  // ------ 删除价格 ------
  const delete_price = (idx:any) =>{
    let _currPriceList:any = currPriceList.filter((v:any,i:number) => {
      return i !== idx
    })
    setcurrPriceList(_currPriceList);
  }

  // ------ 置顶状态改变 ------
  const is_top_change = (val:any,pro:any) => {
    api.UpdateProduct({
      pro_id:pro.pro_id,
      is_top:val
    }).then((res:any)=>{
      message.success(!!val ? '置顶成功' : '取消置顶成功');
      init_state();
      _getProductList({})
    })
  }

  // ------ 上线状态改变 ------
  const is_show_change = (val:any,pro:any) => {
    api.UpdateProduct({
      pro_id:pro.pro_id,
      is_show:val
    }).then((res:any)=>{
      message.success(!!val ? '上线成功' : '下架成功');
      init_state();
      _getProductList({});
    })
  }


  // ************************************ 组件 ************************************
  const drawer_content:any = () => {
    const {
      title,
      substitle,
      pro_number,
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
          {
            showSelect && <Col span={4}>
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
          }
          {/* 分类列表 */}
          {
            showSelect && <Col span={4}>
              <Form.Item
                name="class_list"
                label="分类"
                initialValue={currClassList}
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
          }
        </Row>

        <Divider orientation="center">
          图片
        </Divider>

        {/* 第三行 */}
        <Row gutter={20}>
          {/* 图片 */}
          <Col span={24}>
            <Form.Item
                name="pro_image_list"
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

        <Divider orientation="center">
          产品参数
        </Divider>

        {/* 第四行 */}
        <Row gutter={50}>
          {/* 产品简介 */}
          <Col span={6}>
            <Form.Item
                name={['pro_detail_list','content']}
                label="产品简介"
                initialValue={currContent}
              >
                <Input.TextArea placeholder={!!currContent ? currContent : '请输入产品简介'} autoSize={true}/>
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

        <Divider orientation="center">
          价格信息
        </Divider>

        {/* 第五行 */}
        <Row gutter={20}>
          <Col span={24}>
            {
              !!currPriceList && currPriceList.map((item:any,idx:number) => {
                return (
                  <Row gutter={20} key={idx}>
                    <Col span={3}>
                      <Form.Item
                        name={['price_list',idx,'price']}
                        label={idx === 0 ? '价格' : ''}
                        initialValue={item.price}
                      >
                      <Input placeholder={item.price}/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        name={['price_list',idx,'date']}
                        label={idx === 0 ? '日期' : ''}
                        initialValue={item.date}
                      >
                      <Input placeholder={item.date || 'XXXX-XX-XX'}/>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item
                        name={['price_list',idx,'currency']}
                        label={idx === 0 ? '货币单位' : ''}
                        initialValue={item.currency}
                      >
                      <Input placeholder={item.currency || '￥'}/>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item
                        name={['price_list',idx,'unit']}
                        label={idx === 0 ? '计量单位' : ''}
                        initialValue={item.unit}
                      >
                      <Input placeholder={item.unit || '吨'}/>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Button danger style={{marginTop:idx === 0 ? 30 : 0}} onClick={()=>{delete_price(idx)}}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                )
              })
            }
            <Row align='top' style={{marginTop: 0}}>
              <Button type="primary" style={{marginTop:30}} onClick={add_price}>
                添加价格
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
        <Select defaultValue="全部" className="select_box" onChange={(val)=>{handleChange('is_show',val)}}>
          {
            selectOptinons.on_show.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
        </Select>
        <Select defaultValue="标签" className="select_box" onChange={(val)=>{handleChange('tags_reg',val)}}>
          {
            selectOptinons.tags.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
          <Option value={''} key='-1'>无</Option>
        </Select>
        <Select defaultValue="分类" className="select_box" onChange={(val)=>{handleChange('class_reg',val)}}>
          {
            selectOptinons.class.map((res:any,idx:number)=>{
              return (
                <Option value={res} key={idx}>{res}</Option>
              )
            })
          }
          <Option value={''} key='-1'>无</Option>
        </Select>
        {/* 添加产品 */}
        <div className="upload_box">
          <Button type="primary"  icon={<UploadOutlined />} onClick={()=>{open_drawer({},-1,'创建')}}>
            添加产品
          </Button>
        </div>
      </div>

      {/****************** 产品列表 ******************/}
      {
        showProList && <div className="pro_list_container">
          <List
            className="pro_list"
            loading={false}
            itemLayout="horizontal"
            dataSource={currProList}
            renderItem={(pro:any,index:number) => (
              <List.Item
                actions={[
                  <Switch checkedChildren="已置顶" unCheckedChildren="未置顶" defaultChecked={pro.is_top} onChange={(val)=>{is_top_change(val,pro)}}/>,
                  <Button type="primary" shape="round" icon={<UnorderedListOutlined />} size="small" ghost onClick={()=>{open_drawer(pro,index,'修改')}}>
                    详情 / 修改
                  </Button>,
                  <Popconfirm
                    title={`确认删除${pro.title}?`}
                    onConfirm={()=>{delete_product(pro)}}
                    onCancel={()=>{message.success('已取消');}}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button type="primary" shape="round" icon={<DeleteOutlined />} size="small" danger>
                      删除
                    </Button>
                  </Popconfirm>
                  ,
                  <Switch checkedChildren="上线" unCheckedChildren="下线" defaultChecked={pro.is_show}  onChange={(val)=>{is_show_change(val,pro)}}/>
                ]}
              >
                <List.Item.Meta
                  title={pro.title}
                  description={pro.substitle}
                  avatar={(
                    <Image src={pro.cover_img.img_url} width={50} height={50}/>
                  )}
                />
              </List.Item>
            )}
          />
        </div>
      }

      {/****************** 抽屉 ******************/}
      <Drawer
        title="产品信息"
        width={750}
        height={650}
        onClose={()=>{
          init_state();
        }}
        placement="bottom"
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {drawer_content()}
      </Drawer>

    </div>
  )
}

export default React.memo(Component);