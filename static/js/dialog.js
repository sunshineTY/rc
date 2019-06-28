define(['jquery', "Delay", 'tmpDialog', 'MyCheckInput'], function ($, Delay, tmpDialog, MyCheckInput) {

var zIndex = 2000;
var oBody = $('body');


function DialogBg (zidx) {
	this.oThis = null;
	this.zidx = zidx;
}
DialogBg.prototype = {
	show: function () {
		var _this = this;

		this.oThis = $(tmpDialog.bgTmp);
		this.oThis.css('z-index', this.zidx);
		oBody.append(this.oThis);

		_this.oThis.fadeIn(300);
		
	},

	close: function () {
		this.oThis.fadeOut(300);
	}
}


return {

	// 修改个人信息弹窗
	userinfoDialog: {
		dialogBg: null,
		dialogWrapper: null,

		show: function () {
			var _this = this;

			// 先添加内容在添加背景
			this.dialogBg = new DialogBg(zIndex);

			this.dialogWrapper = $(tmpDialog.userinfoTmp);
			this.dialogWrapper.css('z-index', zIndex + 1);
			oBody.append(this.dialogWrapper);

			zIndex+=2;
			
			this.dialogWrapper.fadeIn(300);
			this.dialogBg.show();

			new Delay().then(function () {
				_this._initState();
				_this._initEvent();
			}).do();
		},

		close: function () {
			this.dialogBg.close();
			this.dialogWrapper.fadeOut(300);
		},

		_initState: function () {
			this.oDialog = this.dialogWrapper.find('.dialog');
			this.oClose = this.dialogWrapper.find('.close-btn');

			this.oCancel = this.dialogWrapper.find('.cancel-btn');
			this.oSubmit = this.dialogWrapper.find('.submit-btn');

			this._setCheckIpt();
		},

		_initEvent: function () {
			var _this = this;

			// 背景点击
			this.dialogWrapper.on('click', function () {
				_this.close();
			})

			// 内容点击阻止冒泡
			this.oDialog.on('click', function (event) {
				event.stopPropagation();
			})

			this.oClose.on('click', function () {
				_this.close();
			})

			this.oCancel.on('click', function () {
				_this.close();
			})

			this.oSubmit.on('click', function () {
				if (_this.oCheckUserInfo.validate()) {
					alert('个人信息修改成功');
				}
			})
		},

		// 设置密码规则
		_setCheckIpt: function () {
			this.oCheckUserInfo = new MyCheckInput({
				rules: {
					userName: [{
						fn: function (val) {
							val = val.trim();
							if (val == '') {
								return '用户名不能为空';
							}

							return ''
						}
					}],

					nikeName: [{
						fn: function (val) {
							val = val.trim();
							if (val == '') {
								return '昵称不能为空';
							}

							return ''
						}
					}]
				}
			})
		}
	},


	// 修改密码弹窗
	resetDialog: {

		dialogBg: null,
		dialogWrapper: null,

		show: function () {
			var _this = this;

			// 先添加内容在添加背景
			this.dialogBg = new DialogBg(zIndex);

			this.dialogWrapper = $(tmpDialog.resetpwdTmp);
			this.dialogWrapper.css('z-index', zIndex + 1);
			oBody.append(this.dialogWrapper);

			zIndex+=2;
			
			this.dialogWrapper.fadeIn(300);
			this.dialogBg.show();

			new Delay().then(function () {
				_this._initState();
				_this._initEvent();
			}).do();
		},

		close: function () {
			this.dialogBg.close();
			this.dialogWrapper.fadeOut(300);
		},

		_initState: function () {
			this.oDialog = this.dialogWrapper.find('.dialog');
			this.oClose = this.dialogWrapper.find('.close-btn');

			this.oCancel = this.dialogWrapper.find('.cancel-btn');
			this.oSubmit = this.dialogWrapper.find('.submit-btn');

			this._setCheckIpt();
		},

		_initEvent: function () {
			var _this = this;

			// 背景点击
			this.dialogWrapper.on('click', function () {
				_this.close();
			})

			// 内容点击阻止冒泡
			this.oDialog.on('click', function (event) {
				event.stopPropagation();
			})

			this.oClose.on('click', function () {
				_this.close();
			})

			this.oCancel.on('click', function () {
				_this.close();
			})

			this.oSubmit.on('click', function () {
				if (_this.oCheckNewPwd.validate()) {
					alert('密码修改成功');
				}
			})
		},

		// 设置密码规则
		_setCheckIpt: function () {
			this.oCheckNewPwd = new MyCheckInput({
				rules: {
					oldPwd: [{
						fn: function (val) {
							val = val.trim();
							if (val == '') {
								return '请输入旧密码';

							} else if (val.length < 6 || val.length > 18) {
								return '密码长度在6到18之间';

							} else if (/[\u4e00-\u9fa5]/.test(val)) {
								return '请输入正确密码格式'
							}

							return ''
						}
					}],

					newPwd1: [{
						fn: function (val) {
							val = val.trim();
							if (val == '') {
								return '请输入旧密码';

							} else if (val.length < 6 || val.length > 18) {
								return '密码长度在6到18之间';

							} else if (/[\u4e00-\u9fa5]/.test(val)) {
								return '请输入正确密码格式'
							}

							return ''
						}
					}],

					newPwd2: [{
						fn: function (val) {
							val = val.trim();

							if (val == '') {
								return '请输入旧密码'

							} else if ($('#newPwd1').val() != val) {
								return '两次密码输入不一致'

							} else if (val.length < 6 || val.length > 18) {
								return '密码长度在6到18之间'

							} else if (/[\u4e00-\u9fa5]/.test(val)) {
								return '请输入正确密码格式'
							}

							return ''
						}
					}]
				}
			})

		}
	}

}


})