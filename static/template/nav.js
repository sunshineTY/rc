define([], function () {

var tmp = `<div class="hd-img-box">
		<img src="./static/img/header/user.jpg">
		<p class="name">王凯</p>
		<p class="state">在线</p>
	</div>

	<div class="nav">
		<div class="nav-item">
			<div class="item-content">
				<img class="icon-img" src="./static/img/nav/icon001.jpg">
				<div class="text">首页</div>
			</div>
		</div>
		<div class="nav-item">
			<div class="item-content has-child">
				<img class="icon-img" src="./static/img/nav/icon004.jpg">
				<div class="text">指标上报</div>
			</div>
			<div class="nav">
				<div class="nav-item">
					<div class="item-content" data-url="./wsy.html?orgId=1&orgName=2&userId=3&userName=4">
						<div class="text">卫生院上报</div>
					</div>
				</div>
				<div class="nav-item">
					<div class="item-content" data-url="./cwss.html?orgId=1&orgName=2&userId=3&userName=4">
						<div class="text">村卫生室上报</div>
					</div>
				</div>
				<div class="nav-item">
					<div class="item-content" data-url="./ypcg.html?orgId=1&orgName=2&userId=3&userName=4">
						<div class="text">药品线下采购上报</div>
					</div>
				</div>
			</div>
		</div>
		<div class="nav-item">
			<div class="item-content has-child">
				<img class="icon-img" src="./static/img/nav/icon002.jpg">
				<div class="text">系统监管</div>
			</div>
		</div>

		<div class="nav-item is-parent">
			<div class="item-content has-child">
				<img class="icon-img" src="./static/img/nav/icon003.jpg">
				<div class="text">业务管理（报表系统）</div>
			</div>

			<div class="nav">
				<div class="nav-item is-parent">
					<div class="item-content has-child">
						<div class="text">综合管理监管</div>
					</div>

					<div class="nav">
						<div class="nav-item">
							<div class="item-content">
								<div class="text">医院基础信息报表</div>
							</div>
						</div>
						<div class="nav-item">
							<div class="item-content">
								<div class="text">高血压患者健康管理报表</div>
							</div>
						</div>
						<div class="nav-item">
							<div class="item-content">
								<div class="text">城乡居民健康档案管理</div>
							</div>
						</div>
						<div class="nav-item">
							<div class="item-content">
								<div class="text">医疗机构中医药服务情况表</div>
							</div>
						</div>
						<div class="nav-item">
							<div class="item-content">
								<div class="text">慢性病病人管理统计报表</div>
							</div>
						</div>								
						<div class="nav-item">
							<div class="item-content">
								<div class="text">传染病及突发公共卫生事件管理</div>
							</div>
						</div>
						<div class="nav-item">
							<div class="item-content">
								<div class="text">0-6岁儿童健康管理</div>
							</div>
						</div>
					</div>

				</div>
				<div class="nav-item">
					<div class="item-content">
						<div class="text">公共卫生监管</div>
					</div>
				</div>
				<div class="nav-item">
					<div class="item-content">
						<div class="text">基本医疗监管</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

return tmp;
})