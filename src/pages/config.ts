import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const homepageConfig: {[key: string] : any} = {
	// 头部导航配置
	'header':{
		titleList:[
			'小程序',
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
					{ 'key':'0_0','subtitle':'主页' },
					{ 'key':'0_1','subtitle':'公司简介' },
					{ 'key':'0_2','subtitle':'商品页' },
					{ 'key':'0_3','subtitle':'个人中心' }
				]
			},
			{
				'title':'访客信息',
				'key':'sub2',
				'icon':LaptopOutlined,
				'itemList':[
					{ 'key':'1_0','subtitle':'option1' },
					{ 'key':'1_1','subtitle':'option1' },
					{ 'key':'1_2','subtitle':'option1' },
					{ 'key':'1_3','subtitle':'option1' }
				]
			},
			{
				'title':'成员管理',
				'key':'sub3',
				'icon':NotificationOutlined,
				'itemList':[
					{ 'key':'2_0','subtitle':'option1' },
					{ 'key':'2_1','subtitle':'option1' },
					{ 'key':'2_2','subtitle':'option1' },
					{ 'key':'2_3','subtitle':'option1' }
				]
			},
		]
	}
}

export default homepageConfig