define([], function () {

const Tools = {
	/**
	 * 存储localStorage
	 */
	setStore (name, data) {
		if (!name) return;
		if (typeof data !== 'string') {
			data = JSON.stringify(data);
		}
		window.localStorage.setItem(name, data);
	},

	/**
	 * 获取localStorage
	 */
	getStore (name) {
		if (!name) return;
		var value = window.localStorage.getItem(name);
	    if (value !== null) {
	        try {
	            value = JSON.parse(value);
	        } catch (e) {
	            value = value;
	        }
	    }
	    return value;
	},

	/**
	 * 删除localStorage
	 */
	removeStore (name) {
		if (!name) return;
		window.localStorage.removeItem(name);
	},

	/****************************************封装Cookie的增删改查****************************************/
	/*
	作用：封装cookie的增和改
	参数：name->当前这条cookie的名称，value->当前cookie的值，day->当前cookie存在的天数为0或为空则为有效时间是当前会话，path->为当前cookie的有效路径不设则为根路径/
	*/
	setCookie: function (name,value,day,path) {
		var result = "";
		result += encodeURIComponent(name)+"="+encodeURIComponent(value);
		if(day) {
			var date = new Date();
			date.setDate(date.getDate()+day);
			result += "; expires="+date;
		}
		if(path) {
			result += "; path="+path;
		} else {
			result += "; path=/";
		}
		document.cookie = result;
	},

	/*
	作用：通过传key值，返回需要的当前key的value值，即封装cookie的查
	参数：name->cookie中的key值
	返回：有则返回value，无则返回""空
	调用方法 console.log(getCookie("phone"));
	*/
	getCookie: function (name) {
		var cookieTxt = decodeURIComponent(document.cookie);
		var arr = cookieTxt.split("; ");
		for(var i=0; i<arr.length; i++) {
			var arr1 = arr[i].split("=");
			if(arr1[0] == name) {
				return arr1[1];
			}
		}
		return "";
	},

	/*
	作用：封装cookie的删
	参数：name->需要删除的cookie的名称
	*/
	removeCookie: function (name) {
		setCookie(name,"",-1);
	},

	/*
	作用：生产验证码
	参数：obj->dom对象，width->宽度， height->高度，show_num->用来保存验证码的数组
	*/
	drawCode: function ({obj, width, height, show_num}) {
		var canvas_width=width;
        var canvas_height=height;
        var canvas = obj;
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        
        for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = this.randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = this.randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    },

    //得到随机的颜色值
    randomColor: function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
}

return Tools;
})