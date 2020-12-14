import '@/scss/components/commodity.scss';

import { ArrowsAltOutlined, DeleteOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Drawer, List, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import api from '../api';

const { Option } = Select;


// const _testdata = {
//   pro_number:'004',
//   title:'液态铝',
//   substitle:'AlXXXXX',
//   is_top:true,
//   is_show:true,
//   extra_flag:false,
//   tags_list:JSON.stringify({
//     list:['标签3']
//   }),
//   class_list:JSON.stringify({
//     list:[]
//   }),
//   pro_image_list:JSON.stringify({
//     list:[
//       {
//         img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//         is_show:true,
//       },
//       {
//         img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//         is_show:true,
//       }
//     ]
//   }),
//   pro_detail_list:JSON.stringify({
//     list:[
//         {
//           type:'info',
//           name:'产品简介',
//           content:"这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介",
//         },
//         {
//           type:'info',
//           name:'产品参数',
//           detail_obj:JSON.stringify(
//             {
//               list:[
//               {
//                 key:'参数1',
//                 value:'xxxx'
//               },
//               {
//                 key:'参数2',
//                 value:'xxxx'
//               },
//               {
//                 key:'参数3',
//                 value:'xxxx'
//               }]
//             }
//           )
//         },
//         {
//           type:'info',
//           name:'主要用途',
//           detail_arr:JSON.stringify(
//             {
//               list:['用途1','用途2']
//             }
//           )
//         }
//       ]
//   }),
//   price_list:JSON.stringify({
//     list:[
//       {
//         date:'2020-12-27',
//         price:'9999',
//         unit:'吨',
//         currency:'¥',
//         is_recent:true
//       }
//     ]
//   })
// }

interface Props {}
let _selectOptinons:{[key:string]:any} = {
  'on_show':['线上商品','已下架','全部'],
  'class':[],
  'tags':[]
}
const Component: React.FC<Props> = ({children}) => {

  const [currProList, setCurrProList] = useState([]);
  const [selectOptinons, setSelectOptinons] = useState(_selectOptinons);
  const [drawerVisible, setDrawerVisible] = useState(false)

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

      // console.log(_selectOptinons);


      setSelectOptinons(_selectOptinons);
      setCurrProList(_productList);
    })
  }, [])


  const handleChange = (val:any) => {
    console.log(`selected ${val}`);
  }

  const clickUpload = (val:any) => {
    // console.log(val);
    setDrawerVisible(true)
  }

  return (
    <div className="commodity_container">
      {/* 筛选项 */}
      <div className="select_container">
        <Select defaultValue="线上" className="select_box" onChange={handleChange}>
          {
            selectOptinons.on_show.map((res:any)=>{
              return (
                <Option value={res}>{res}</Option>
              )
            })
          }
        </Select>
        <Select defaultValue="分类" className="select_box" onChange={handleChange}>
          {
            selectOptinons.class.map((res:any)=>{
              return (
                <Option value={res}>{res}</Option>
              )
            })
          }
        </Select>
        <Select defaultValue="标签" className="select_box" onChange={handleChange}>
          {
            selectOptinons.tags.map((res:any)=>{
              return (
                <Option value={res}>{res}</Option>
              )
            })
          }
        </Select>
        {/* 添加产品 */}
        <div className="upload_box">
          <Button type="primary" shape="round" icon={<UploadOutlined />} onClick={clickUpload}>
            添加产品
          </Button>
        </div>
      </div>

      {/* 产品列表 */}
      {/* actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]} */}
      <div className="pro_list_container">
        <List
          className="pro_list"
          loading={false}
          itemLayout="horizontal"
          dataSource={currProList}
          renderItem={(pro:any) => (
            <List.Item
              actions={[
                // <a key="list-loadmore-edit">edit</a>,
                // <a key="list-loadmore-more">more</a>
                <Switch checkedChildren="已置顶" unCheckedChildren="未置顶" defaultChecked={pro.is_top} />,
                <Button type="primary" shape="round" icon={<UnorderedListOutlined />} size="small" ghost>
                  详情
                </Button>,
                <Button type="primary" shape="round" icon={<ArrowsAltOutlined />} size="small" >
                  修改
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

      {/* 抽屉 */}
      {/* <div className="drawer_container"> */}
        <Drawer
          title="添加产品"
          width={750}
          onClose={()=>{setDrawerVisible(false)}}
          placement="top"
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary">
                Submit
              </Button>
            </div>
          }
        >
        </Drawer>
      {/* </div> */}

    </div>
  )
}

export default React.memo(Component);