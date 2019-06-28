define(['jquery', 'LightTip', 'API', 'header', 'nav'], function ($, LightTip, API, header, nav) {
return function () {
	var oPage = {
		oIpts: null,		// 存放所有输入框对象
		query: null,		// 键值对
		details: null,		// 当前的数据对象

		init: function () {
			var query = this.getQuery();
			if (!query) {
				console.log('请传入键值对');
				return;
			} else {
				this.query = query;
			}

			this.initState();
			this.initEvent();
		},

		initState: function () {
			header.init();
			nav.init();

			$('.home-btn').attr('href', this.query.homePage ||  'javascript:;');
			$('.now-organ').text(decodeURIComponent(this.query.orgName) || '');

			// 年
			this.oYearSel = $('#year');
			this.setYear(this.oYearSel);

			// 所有输入框
			this.oAllIpt = $('.full-in-ipt');

			// 提交
			this.oSubmit = $('#submit');

			// 取消
			this.oClear = $('#clear');

			this.getIpts();				// 获取输入框对象
			this.loadDefault();			// 加载当前的值
		},

		initEvent: function () {
			var _this = this;

			this.oYearSel.on('change', function () {
				_this.loadDefault();
			})


			this.oAllIpt.on('input', function () {
				_this.checkFullIn($(this));
			})


			// 提交保存数据
			this.oSubmit.on('click', function () {
				if (_this.checkFullIn()) {
					_this.setDefaultVal();

				}
			})

			// 取消
			this.oClear.on('click', function () {
				_this.setIpts();
				_this.clearCheck();
			})
		},

		/**
		 * @name: 获取search键值对
		 */
		getQuery: function () {
			var result = {};
			var search = location.search;
			try {
				search = search.split('?')[1].split('&');
				search.forEach(function (item) {
					var arr = item.split('=');
					result[arr[0]] = arr[1];
				})

				return result;
			} catch(err) {
				return false;
			}
		},

		/**
		 * @name: 设置年下拉框值
		 */
		setYear: function (obj) {
			var nowYear = new Date().getFullYear();
			var html = '';
			for(var i = nowYear; i > nowYear - 10; i--) {
				html += '<option value="' + i + '">' + i + '</option>'
			}
			obj.html(html);
		},

		/**
		 * @name: 获取输入框对象
		 */
		getIpts: function () {
			this.oIpts = {
				cfzs: $('#cfzs'),								// 处方总数
				etzrs036y: $('#etzrs036y'),						// 0-36儿童总人数
				etzytyfwzrs036y: $('#etzytyfwzrs036y'),			// 0-36月儿童中医调养服务总人数
				lnrzs65sys: $('#lnrzs65sys'),					// 65岁以上老年人总数
				lnrzytzbsrs65sys: $('#lnrzytzbsrs65sys'),		// 65岁以上老年人中医体质辨识人数
				nzhxdxcys: $('#nzhxdxcys'),						// 能中会西的乡村医生（人）
				zcy: $('#zcy'),									// 中成药（种）
				zycf: $('#zycf'),								// 中医处方
				zycfszcfzsbl: $('#zycfszcfzsbl'),				// 中医处方数占处方总数比例
				zyyjsff: $('#zyyjsff'),							// 中医药技术方法（种）
				zyyp: $('#zyyp'),								// 中药饮片（种）
				zyysyjs: $('#zyysyjs'),							// 中医药适宜技术（项）
				zyzlsb: $('#zyzlsb')							// 中医诊疗设备（种）
			}
		},

		/**
		 * @name: 设置输入框对象
		 */
		setIpts: function (data) {
			if (data) {
				this.details= data;
				delete this.details.txTime;
			}

			for (var i in this.oIpts) {
				$(this.oIpts[i]).val(data ? data[i] : '');
			}
		},

		/**
		 * @name: 验证填报输入框
		 */
		checkFullIn: function (obj) {
			var _this = this;
			var result = true;

			if (obj) {
				result = check(obj)

			} else {
				for (var i in this.oIpts) {
					var res = check($(this.oIpts[i]));
					if (result) {
						result = res;
					}
				}
			}

			function check (obj) {
				var result = true;
				var oParent = obj.parent().parent();
				var oTip = obj.prev();
				var val = obj.val();

				var tip = '';

				if (!val) {
					result = false;
					tip = '请填入正整数';
				}

				if (!/^[1-9]\d*$/.test(val)) {
					result = false;
					tip = '请填入正整数';
				}

				if (!result) {
					oTip.text(tip);
					oParent.addClass('is-error');
				} else {
					oTip.text();
					oParent.removeClass('is-error');
				}

				return result;
			}

			return result;
		},

		/**
		 * @name: 获取当前年的数据
		 */
		clearCheck: function () {
			for (var i in this.oIpts) {
				var item = $(this.oIpts[i]);

				var oParent = item.parent().parent();
				var oTip = item.prev();

				oTip.text('');
				oParent.removeClass('is-error');
			}
		},

		/**
		 * @name: 获取当前年的数据
		 */
		loadDefault: function () {
			var _this = this;

			$.ajax({
				url: API.fullIn.cwss,
				data: {
					orgId: this.query.orgId || '',
					userId: this.query.userId || '',
					areaId: this.query.areaId || '',
					year: this.oYearSel.val()
				},
				success: function (res) {
					if (res.code == 200) {
						_this.setIpts(res.data);
					}
					
				},
				error: function (res) {
					$.lightTip.error('后台服务器正在维护或升级，请稍后再试。', 1500);
				}
			})
		},

		/**
		 * @name: 设置当前的值
		 */
		setDefaultVal: function (data) {
			var _this = this;

			if (!this.details) {
				$.lightTip.error('后台服务器正在维护或升级，请稍后再试。', 1500);
				return;
			}

			for (var i in this.oIpts) {
				if (i in this.details) {
					this.details[i] = this.oIpts[i].val();
				}
			}

			$.ajax({
				url: API.fullIn.saveCwss,
				type: 'post',
				data: this.details,
				success: function (res) {
					if (res.code == 200) {
						_this.setIpts(res.data);
						$.lightTip.success('数据保存成功', 1500);
					} else {
						$.lightTip.error('数据保存失败', 1500);
					}
				},
				error: function (res) {
					$.lightTip.error('后台服务器正在维护或升级，请稍后再试。', 1500);
				}
			})
		}
	}

	$(function () {

		oPage.init();

	})
}
})