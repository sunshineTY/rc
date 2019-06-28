define(['jquery', 'tmpHeader', 'dialog'], function ($, tmpHeader, dialog) {
return {

	init: function () {

		this.oHeader = $('#tmpHeader');

		this.setHeaderHtml();
	},

	initState: function () {
		this.oUserInfo = this.oHeader.find('.user-info-btn');
		this.oResetPwd = this.oHeader.find('.reset-pwd-btn');
		this.oLogout = this.oHeader.find('.logout-btn');
	},

	initEvent: function () {
		var _this = this;

		// 个人信息
		this.oUserInfo.on('click', function () {
			dialog.userinfoDialog.show();
		})

		// 修改密码
		this.oResetPwd.on('click', function () {
			dialog.resetDialog.show();
		})

		// 注销
		this.oLogout.on('click', function () {
			location.href = './login.html';
		})
	},

	// 设置头部内容
	setHeaderHtml: function () {
		var _this = this;

		this.oHeader.html(tmpHeader);

		setTimeout(function () {
			_this.initState();
			_this.initEvent();
		}, 100);
	}
}
})