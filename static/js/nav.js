define(['jquery', 'tmpNav'], function ($, tmpNav) {
return {

	init: function () {

		this.oTmpNav = $('#tmpNav');
		
		this.setNavHtml();
	},

	initState: function () {

		this.oNavItem = this.oTmpNav.find('.nav-item');
		this.oItemBtn = this.oTmpNav.find('.item-content');

	},

	initEvent: function () {
		var _this = this;


		// mpnav移出
		this.oTmpNav.on('mouseleave', function () {
			_this.oNavItem.removeClass('is-open');
			_this.oNavItem.find('.nav').css('display', 'none');
		})

		// 菜单点击显隐树
		this.oNavItem.on('click', function (event) {
			event.stopPropagation();

			var oThis = $(this);
			var oChild = oThis.children();

			if (oThis.hasClass('is-open')) {
				oChild.eq(1).slideUp(300);
				oChild.eq(1).animate({
					opacity: 0
				}, 300);
				oThis.removeClass('is-open');

			} else {
				if (oChild.length > 1) {
					oChild.eq(1).slideToggle(300);
					oChild.eq(1).animate({
						opacity: 1
					}, 300);
					oThis.addClass('is-open');
				}
			}

				
		})

		// 文本点击
		this.oItemBtn.on('click', function () {
			var oThis = $(this);
			var url = oThis.data('url');

			if (!oThis.hasClass('has-child')) {
				_this.oItemBtn.removeClass('active');
				oThis.addClass('active');
			}

			if (url) {
				location.href = url;
			}

		})
	},

	setNavHtml: function () {
		var _this = this;

		this.oTmpNav.html(tmpNav);

		setTimeout(function () {
			_this.initState();
			_this.initEvent();
		}, 100);
	}
}
})