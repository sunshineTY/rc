require.config({
	baseUrl: "./static/js",
	paths: {
		// 依赖库
		"jquery": "../lib/jquery.min",
		"LightTip": "../lib/lulu-ui/js/LightTip",

			
		// 组件
		'tmpHeader': '../template/header',
		"tmpNav": "../template/nav",
		"tmpDialog": "../template/dialog",

		// 公用方法
		"Tools": "../utils/tools",
		"Delay": "../utils/delay",
		"API": "../utils/API",
		"MyCheckInput": "../utils/my-check-input/my-check-input",

		// 逻辑文件
		"login": "login",
		"header": 'header',
		"nav": "nav",
		"dialog": "dialog",
		"wys": "wsy"
	}
})

var page = document.querySelector('[data-page]').getAttribute('data-page');
require([page], function (page) {
	page();
})