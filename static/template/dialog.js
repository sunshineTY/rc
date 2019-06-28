define([], function () {

var tmp = {

// 遮罩
bgTmp: `<div class="dialog-bg"></div>`,

// 个人信息
userinfoTmp: `<div class="dialog-wrapper">
		<div class="dialog userinfo-dialog">
			<div class="dialog_header">
				<span>修改个人信息</span>
				<button class="close-btn"></button>
			</div>
			<div class="dialog_body">
				<div class="my-check-input is-require">
					<div class="label-box">
						<div class="label">用户名</div>
					</div>
					<div class="input-box">
						<p class="tip"></p>
						<input type="text" class="full-in-ipt total-je-ipt" id="userName" placeholder="请输入用户名" disabled>
					</div>
				</div>
				<div class="my-check-input is-require">
					<div class="label-box">
						<div class="label">用户昵称</div>
					</div>
					<div class="input-box">
						<p class="tip"></p>
						<input type="text" class="full-in-ipt total-je-ipt" id="nikeName" placeholder="请输入昵称">
					</div>
				</div>
			</div>
			<div class="dialog_footer">
				<button class="my-btn cancel-btn">取消</button>
				<button class="my-btn primary submit-btn">确定</button>
			</div>
		</div>
	</div>`,


// 修改密码
resetpwdTmp: `<div class="dialog-wrapper">
		<div class="dialog resetpwd-dialog">
			<div class="dialog_header">
				<span>修改密码</span>
				<button class="close-btn"></button>
			</div>
			<div class="dialog_body">
				<div class="my-check-input is-require">
					<div class="label-box">
						<div class="label">旧密码</div>
					</div>
					<div class="input-box">
						<p class="tip"></p>
						<input type="password" class="full-in-ipt total-je-ipt" id="oldPwd" placeholder="请输入旧密码">
					</div>
				</div>
				<div class="my-check-input is-require">
					<div class="label-box">
						<div class="label">新密码</div>
					</div>
					<div class="input-box">
						<p class="tip"></p>
						<input type="password" class="full-in-ipt total-je-ipt" id="newPwd1" placeholder="请输入新密码">
					</div>
				</div>
				<div class="my-check-input is-require">
					<div class="label-box">
						<div class="label">再次输入</div>
					</div>
					<div class="input-box">
						<p class="tip"></p>
						<input type="password" class="full-in-ipt total-je-ipt" id="newPwd2" placeholder="请再次输入新密码">
					</div>
				</div>
			</div>
			<div class="dialog_footer">
				<button class="my-btn cancel-btn">取消</button>
				<button class="my-btn primary submit-btn">确定</button>
			</div>
		</div>
	</div>`
}


return tmp;
})