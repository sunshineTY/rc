define(['jquery', 'MyCheckInput'], function ($, MyCheckInput) {
return function () {

	var oPage = {

		oCheckIpt: null,

		init: function () {

			this.oName = $('#name');
			this.oPwd = $('#pwd');

			this.oSubmit = $('.submit-btn');

			this.initState();
			this.initEvent();
		},

		initState: function () {
			var _this = this;

			// 初始化验证
			this.setCheckIpt();
		},

		initEvent: function () {
			var _this = this;

			// 登录点击
			this.oSubmit.on('click', function () {
				var bl = _this.oCheckIpt.validate();

				if (bl) {

					_this.doLogin();
				}
			})
		},

		// 初始化验证
		setCheckIpt: function () {
			this.oCheckIpt = new MyCheckInput({
				rules: {
					name: [{
						fn: function (val) {
							if (val == '') {
								return '用户名不能为空';
							}
							return '';
						}
					}],

					pwd: [{
						fn: function (val) {
							var reg = /[\u4e00-\u9fa5]/;

							if (val == '') {
								return '密码不能为空'
							} else if (val.length < 6 || val.length > 18) {
								return '密码长度在6到18之间'
							} else if (reg.test(val)) {
								return '请输入正确密码格式'
							}

							return '';
						}
					}]
				}
			})
		},


		// 登录
		doLogin: function () {
			location.href = './index.html';
		}


	}

	

	$(function () {
		oPage.init();
	})
}
})