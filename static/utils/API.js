define([], function () {
	const HOST1 = 'http://192.168.9.97:9527';

	const API = {
		
		// 填报
		fullIn: {
			wsy: HOST1 + '/wsytb/getWsyTjb',				// 卫生院
			saveWsy: HOST1 + '/wsytb/saveWsyTjb',		// 保存卫生院

			cwss: HOST1 + '/cwsstb/getCwssTjb',			// 村卫生室
			saveCwss: HOST1 + '/cwsstb/saveCwssTjb',		// 保存村卫生室

			ypcg: HOST1 + '/wsyyptb/getWsyYpTjb',		// 卫生院药品采购
			saveYpcg: HOST1 + '/wsyyptb/saveWsyYpTjb',	// 保存药品采购
		}
	}

	return API;
})