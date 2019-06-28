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

			// 月
			this.oMonthSel = $('#month');

			// 所有输入框
			this.oAllIpt = $('.full-in-ipt');

			// 金额输入框
			this.oJeIpt = $('.je-ipt');

			// 总金额
			this.oTotalJe = $('.total-je-ipt');

			// 提交
			this.oSubmit = $('#submit');

			// 取消
			this.oClear = $('#clear');

			this.setYear();				// 设置年下拉框
			this.getIpts();				// 获取输入框对象
			this.loadDefault();			// 加载当前的值
		},

		initEvent: function () {
			var _this = this;

			this.oYearSel.on('change', function () {
				_this.setMonth($(this).val());
				_this.loadDefault();
			})

			this.oMonthSel.on('change', function () {
				_this.loadDefault();
			})

			this.oAllIpt.on('input', function () {
				var total = 0;

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
		setYear: function () {
			var nowYear = new Date().getFullYear();
			var html = '';
			for(var i = nowYear; i > nowYear - 10; i--) {
				html += '<option value="' + i + '">' + i + '</option>'
			}
			this.oYearSel.html(html);

			this.setMonth(nowYear);
		},

		/**
		 * @name: 设置月下拉框值
		 */
		setMonth: function (iYear) {
			var nowYear = new Date().getFullYear();
			var nowMonth = new Date().getMonth();
			var length = 12;

			if (iYear == nowYear) {
				length = nowMonth + 1;
			}

			var html = '';
			for (var i = length; i >= 1; i--) {
				html += '<option value="' + i + '">' + (i > 9 ? i : '0' + i ) + '</option>'
			}

			this.oMonthSel.html(html);
		},

		/**
		 * @name: 获取输入框对象
		 */
		getIpts: function () {
			this.oIpts = {
				jbywcgje: $('#jbywcgje'),	// 基本药品采购金额
				mjcycgje: $('#mjcycgje'),	// 免煎药品采购金额
				zyypcgje: $('#zyypcgje'),	// 中药饮片采购金额
				xxypcgje: $('#xxypcgje'),	// 线下药品采购金额
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
				var val = obj.val().trim();

				var tip = '';

				if (val === '') {
					result = false;
					tip = '请填入金额';
				}

				if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val)) {
					result = false;
					tip = '请正确填入金额';
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
				url: API.fullIn.ypcg,
				data: {
					orgId: this.query.orgId || '',
					userId: this.query.userId || '',
					areaId: this.query.areaId || '',
					year: this.oYearSel.val(),
					month: this.oMonthSel.val(),
				},
				success: function (res) {
					if (res.code == 200) {
						_this.setIpts(res.data);
					}
					
				},
				error: function (res) {
					console.log(1223123);
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
				url: API.fullIn.saveYpcg,
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