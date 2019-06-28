define(['jquery', 'header', 'nav'], function ($, header, nav) {
return function () {

	var oPage = {

		init: function () {


			this.initState();
			this.initEvent();
		},

		initState: function () {
			var _this = this;

			header.init();
			nav.init();
		},

		initEvent: function () {
			var _this = this;

		}
	}

	

	$(function () {
		oPage.init();
	})
}
})