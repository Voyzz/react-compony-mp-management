// 输出
// const _output_data: = {
//   pro_id:'pro_111111',
//   pro_number:'001',
//   title:'商品标题',
//   substitle:'Production Subtitle',
//   // is_favorite:false,
//   is_top:false,
//   is_show:true,
//   extra_flag:false,
//   tags_list:[],
//   class_list:['热门','液态'],
//   cover_img: {
//     is_cover:true,
//     pro_id:'pro_111111',
//     img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//     is_show:true,
//     img_id:'img_11111'
//   },
//   pro_image_list:{
//     list:[
//       {
//         is_cover:true,
//         pro_id:'pro_111111',
//         img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//         is_show:true,
//         img_id:'img_11111'
//       },
//       {
//         is_cover:false,
//         pro_id:'pro_111111',
//         img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//         is_show:true,
//         img_id:'img_2222'
//       },
//       {
//         is_cover:false,
//         pro_id:'pro_111111',
//         img_url:'https://img.yzcdn.cn/vant/cat.jpeg',
//         is_show:true,
//         img_id:'img_3333'
//       }
//     ]
//   },
//   pro_detail_list:{
//     list:[
//       {
//         pro_id:'pro_111111',
//         type:'info',
//         name:'产品简介',
//         content:"这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介",
//         detail_obj:{},
//         detail_arr:[]
//       },
//       {
//         pro_id:'pro_111111',
//         type:'info',
//         name:'产品参数',
//         content:"",
//         detail_obj:[
//           {
//             key:'参数1',
//             value:'xxxx'
//           },
//           {
//             key:'参数2',
//             value:'xxxx'
//           },
//           {
//             key:'参数3',
//             value:'xxxx'
//           }
//         ],
//         detail_arr:[]
//       },
//       {
//         pro_id:'pro_111111',
//         type:'info',
//         name:'主要用途',
//         content:"",
//         detail_obj:{},
//         detail_arr:['用途1','用途2','用途3']
//       }
//     ]
//  },
//   price_list:{
//     list:[
//       {
//         pro_id:'pro_111111',
//         date:'2020-12-20',
//         price:'10000',
//         unit:'吨',
//         currency:'¥',
//         is_recent:true
//       }
//     ]
//   }
// }


// // ************** 输入 **************
// const _input_data = {
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