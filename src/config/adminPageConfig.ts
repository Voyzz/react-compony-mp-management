import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const homepageConfig: {[key: string] : any} = {
	// 头部导航配置
	'header':{
		titleList:[
			'小程序中台',
		],
		theme:"dark",
	},
	'sider':{
		subMenuList:[
			{
				'title':'页面配置',
				'key':'sub1',
				'icon':UserOutlined,
				'itemList':[
					{ 'key':'0_0','subtitle':'商品页' },
					{ 'key':'0_1','subtitle':'主页' },
					{ 'key':'0_2','subtitle':'公司简介' }
				]
			},
			{
				'title':'用户信息',
				'key':'sub2',
				'icon':LaptopOutlined,
				'itemList':[
					{ 'key':'1_0','subtitle':'用户信息' }
				]
			},
			{
				'title':'成员管理',
				'key':'sub3',
				'icon':NotificationOutlined,
				'itemList':[
					{ 'key':'2_0','subtitle':'成员管理' }
				]
			},
		]
	}
}

export default homepageConfig