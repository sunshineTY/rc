define(['jquery', 'LightTip', 'API', 'header', 'nav'], function ($, LightTip, API, header, nav) {
return function () {

	var oPage = {
		oIpts: null,		// 存放所有输入框对象
		query: null,		// 键值对
		details: null,		// 当前的数据对象

		init: function () {
			var query = this.getQuery();
			if (!query || !query.userId || !query.orgId) {
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
				bzcw: $('#bzcw'),							// 编制床位
				bzrs: $('#bzrs'),							// 编制人数
				fjhzzgls: $('#fjhzzgls'),					// 肺结核追踪管理数
				gdgsjdnhcs: $('#gdgsjdnhcs'),				// 该地该时间段内活产数
				gxyyglrs: $('#gxyyglrs'),					// 高血压（应管理）人数
				jcrs: $('#jcrs'),							// 借出人数
				jrrs: $('#jrrs'),							// 借入人数
				jsbyglrs: $('#jsbyglrs'),					// 精神病（应管理）人数
				lsgrs: $('#lsgrs'),							// 临时工人数
				lswjry: $('#lswjry'),						// 临时卫技人员
				mzymndyjzrs: $('#mzymndyjzrs'),				// 某种疫苗年度应接种人数
				ndxqnd036gyets: $('#ndxqnd036gyets'),		// 年度辖区内的0～36个月儿童数
				ndxqnhcs: $('#ndxqnhcs'),					// 年度辖区内活产数
				ndxqnygld06sets: $('#ndxqnygld06sets'),		// 年度辖区内应管理的0～6岁儿童数
				ndxqnyjlyfjzzrs: $('#ndxqnyjlyfjzzrs'),		// 年度辖区内应建立预防接种证人数
				nnxqn65sjysczjms: $('#nnxqn65sjysczjms'),	// 年内辖区内65岁及以上常住居民数
				nnxqngxyhzzrs: $('#nnxqngxyhzzrs'),			// 年内辖区内高血压患者总人数
				nnxqntnbhzzrs: $('#nnxqntnbhzzrs'),			// 年内辖区内糖尿病患者总人数
				pjltxrs: $('#pjltxrs'),						// 平均离退休人数
				qkyszs: $('#qkyszs'),						// 全科医师总数
				qmltxrs: $('#qmltxrs'),						// 期末离退休人数
				qmzbrs: $('#qmzbrs'),						// 期末在编人数
				qmzbzzrs: $('#qmzbzzrs'),					// 期末在编在职人数
				tnbyglrs: $('#tnbyglrs'),					// 糖尿病（应管理）人数
				xqn15sjysrkzs: $('#xqn15sjysrkzs'),			// 辖区内15岁及以上人口总数
				xqrs: $('#xqrs'),							// 辖区人数
				xseyglrs: $('#xseyglrs'),					// 新生儿（应管理）人数
				ycfyglrs: $('#ycfyglrs'),					// 孕产妇应管理人数
				yszs: $('#yszs'),							// 医师总数
				zylbqkyss: $('#zylbqkyss'),					// 中医类别全科医师数
				zylbys: $('#zylbys'),						// 中医类别医师
				zyyjsff: $('#zyyjsff'),						// 中医药技术方法（种）
				zyysyjs: $('#zyysyjs'),						// 中医药适宜技术
				zyzlsb: $('#zyzlsb'),						// 中医诊疗设备

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

				console.log(result);

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
				url: API.fullIn.wsy,
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
				url: API.fullIn.saveWsy,
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