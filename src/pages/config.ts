import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const homepageConfig: {[key: string] : any} = {
	// 头部导航配置
	'header':{
		titleList:[
			'nav 1',
			'nav 2',
			'nav 3',
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
					{ 'key':'1','subtitle':'option1' },
					{ 'key':'2','subtitle':'option1' },
					{ 'key':'3','subtitle':'option1' },
					{ 'key':'4','subtitle':'option1' }
				]
			},
			{
				'title':'访客信息',
				'key':'sub2',
				'icon':LaptopOutlined,
				'itemList':[
					{ 'key':'5','subtitle':'option1' },
					{ 'key':'6','subtitle':'option1' },
					{ 'key':'7','subtitle':'option1' },
					{ 'key':'8','subtitle':'option1' }
				]
			},
			{
				'title':'成员管理',
				'key':'sub3',
				'icon':NotificationOutlined,
				'itemList':[
					{ 'key':'1','subtitle':'option1' },
					{ 'key':'2','subtitle':'option1' },
					{ 'key':'3','subtitle':'option1' },
					{ 'key':'4','subtitle':'option1' }
				]
			},
		]
	}
}

export default homepageConfig