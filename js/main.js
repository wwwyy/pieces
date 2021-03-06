(function(){
	var wrap = document.querySelector('.wrap');
	var n = 0;
	var shard = document.querySelectorAll('.shard');
	var img = document.querySelector('.wrap img');
	var shadow = document.querySelector('.shadow');
	var onOff = false;
	var on = true;
	var off = false;
	var resize = false;
	var btn;
	var timer = null;
	wrap.onmouseover = function(){
		clearInterval(timer);
	};
	document.addEventListener('mousewheel',fn1);
	document.onclick = function () {   //第一次点击从loge跳转到第一张图片，并生成四个按钮
		if(!onOff||!on){
			return;
		}
		img.style.display = 'none';
		for(var j = 0;j < 30;j++){
			shard[j].style.animation = '';
		}
		document.body.style.background = arrColor[n];
		for ( var j = 0; j < arr[n].length; j++ ) {
			shard[j].style.webkitClipPath = arr[n][j].poly;
			shard[j].style.backgroundColor = arr[n][j].bc;
			if(arr[n][j].animat){
				shard[j].style.animation = arr[n][j].animat;
			}
		}
		for(var i = 0;i<shadow.children.length;i++){
			shadow.children[i].style.width = arrshadow[n][i].width;
			shadow.children[i].style.height = arrshadow[n][i].height;
			shadow.children[i].style.position = arrshadow[n][i].pos;
			shadow.children[i].style.left = arrshadow[n][i].left;
			shadow.children[i].style.bottom = arrshadow[n][i].bottom;
			shadow.children[i].style.borderRadius = arrshadow[n][i].border;
			shadow.children[i].style.backgroundImage = arrshadow[n][i].gradient;
		}

		var body = document.body;
		var prev = document.createElement('a');
		var next = document.createElement('a');
		var self = document.createElement('a');
		btn = document.createElement('a');
		prev.className = 'prev';
		next.className = 'next';
		self.className = 'self';
		btn.className = 'btn';
		body.appendChild(prev);
		body.appendChild(next);
		body.appendChild(self);
		body.appendChild(btn);
		prev.innerHTML = 'BEFORE';
		next.innerHTML = 'NEXT';
		self.innerHTML = 'AUTO';
		btn.innerHTML = 'JUMP';
		mTween(prev,{opacity:100},2500,"bounceOut");
		mTween(next,{opacity:100},2500,"bounceOut");
		mTween(self,{opacity:100},2500,"bounceOut");
		mTween(btn,{opacity:100},2500,"bounceOut");
		prev.onclick = function(){  //上一张点击，通过n--跳转上一张，做判断，有额外添加的三角时，跳转清掉
			if (off) {
				return;
			}
			clearInterval(timer);
			for(var j = 0;j < 30;j++){
				shard[j].style.animation = '';
			}
			if(n<=0){ //0 1 2 3
				n = arr.length;
			}
			n--;
			document.body.style.background = arrColor[n];
			for ( var j = 0; j < arr[n].length; j++ ) {
				shard[j].style.webkitClipPath = arr[n][j].poly;
				shard[j].style.backgroundColor = arr[n][j].bc;
				if(arr[n][j].animat){
					shard[j].style.animation = arr[n][j].animat;
				}
			}
			for(var i = 0;i<shadow.children.length;i++){
				shadow.children[i].style.width = arrshadow[n][i].width;
				shadow.children[i].style.height = arrshadow[n][i].height;
				shadow.children[i].style.position = arrshadow[n][i].pos;
				shadow.children[i].style.left = arrshadow[n][i].left;
				shadow.children[i].style.bottom = arrshadow[n][i].bottom;
				shadow.children[i].style.borderRadius = arrshadow[n][i].border;
				shadow.children[i].style.backgroundImage = arrshadow[n][i].gradient;
			}

			if(n+1<=arr.length-1&&arr[n+1].length>30){
				for(var i = 30;i<arr[n+1].length/*-1*/;i++){
					shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
				}
			}
		};
		next.onclick = function(){  //下一张
			if (off) {
				return;
			}
			clearInterval(timer);
			for(var j = 0;j < 30;j++){
				shard[j].style.animation = '';
			}
			n++
			if(n>arr.length-1){ //0 1 2 3
				n = 0;
			}
			document.body.style.background = arrColor[n];
			for ( var j = 0; j < arr[n].length; j++ ) {
				shard[j].style.webkitClipPath = arr[n][j].poly;
				shard[j].style.backgroundColor = arr[n][j].bc;
				if(arr[n][j].animat){
					shard[j].style.animation = arr[n][j].animat;
				}
			}
			for(var i = 0;i<shadow.children.length;i++){
				shadow.children[i].style.width = arrshadow[n][i].width;
				shadow.children[i].style.height = arrshadow[n][i].height;
				shadow.children[i].style.position = arrshadow[n][i].pos;
				shadow.children[i].style.left = arrshadow[n][i].left;
				shadow.children[i].style.bottom = arrshadow[n][i].bottom;
				shadow.children[i].style.borderRadius = arrshadow[n][i].border;
				shadow.children[i].style.backgroundImage = arrshadow[n][i].gradient;
			}
			if(n-1>=0&&arr[n-1].length>30){
				for(var i = 30;i<arr[n-1].length;i++){
					shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
				}
			}
		};
		self.onclick = function(){   //运用定时器自动播放
			clearInterval(timer);
			if(off){
				return;
			}
			timer = setInterval(function(){
				for(var j = 0;j < 30;j++){
					shard[j].style.animation = '';
				}
				n++
				if(n>arr.length-1){ //0 1 2 3
					n = 0;
				}
				for ( var j = 0; j < arr[n].length; j++ ) {
					shard[j].style.webkitClipPath = arr[n][j].poly;
					shard[j].style.backgroundColor = arr[n][j].bc;
					if(arr[n][j].animat){
						shard[j].style.animation = arr[n][j].animat;
					}
				}
				for(var i = 0;i<shadow.children.length;i++){
					shadow.children[i].style.width = arrshadow[n][i].width;
					shadow.children[i].style.height = arrshadow[n][i].height;
					shadow.children[i].style.position = arrshadow[n][i].pos;
					shadow.children[i].style.left = arrshadow[n][i].left;
					shadow.children[i].style.bottom = arrshadow[n][i].bottom;
					shadow.children[i].style.borderRadius = arrshadow[n][i].border;
					shadow.children[i].style.backgroundImage = arrshadow[n][i].gradient;
				}

				if(n-1>=0&&arr[n-1].length>30){
					for(var i = 30;i<arr[n-1].length/*-1*/;i++){
						shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
					}
				}
			},5000);
		};
		var circle = document.getElementById('circle');
		var desc = document.querySelector('.desc');
		var str = '';
		btn.onclick = function (ev) { //点击跳转按钮时，
			if(off){
				return;
			}
			off = true;
			ev.cancelBubble = true;
			body.style.background = "#000";
			for(var i = 30;i<shard.length/*-1*/;i++){
				shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
			}
			for ( var i = 0; i < 30; i++ ) {
				shard[i].style.animation = '';
				shard[i].style.webkitClipPath = arrLoad[2][i].poly;
				shard[i].style.backgroundColor = arrLoad[2][i].bc;
			}
			for(var i = 0;i<shadow.children.length;i++){
				shadow.children[i].style.width = '';
				shadow.children[i].style.height = '';
				shadow.children[i].style.position = '';
				shadow.children[i].style.left = '';
				shadow.children[i].style.bottom = '';
				shadow.children[i].style.borderRadius = '';
				shadow.children[i].style.backgroundImage = '';
			}

			str = '<div class="text"><p>IN PIECES</p><p>30 SPECIES</p><p>12 SPECES</p><p>1 FRAGMENTED SURVIVAL</p><p>SELECT A PIECE FROM THE RING, OR SELECT A PIECE RANDOMLY</p></div>';

			desc.innerHTML = str;

			var svg = document.getElementById('svg');
			var div = document.getElementById('circle');
			var svgNS = "http://www.w3.org/2000/svg";  //svg的命名空间

			function createTag(tag,objAttr) { //创建标签，添加属性
				var tag = document.createElementNS(svgNS,tag);  //
				for ( var attr in objAttr ) {     //for(var s in obj){}
					tag.setAttribute(attr,objAttr[attr]);
				}
				return tag;
			}

				var centerX = div.offsetHeight/2;
				var centerY = div.offsetWidth/2;
				var cirNum = 12;
				var angleNum = 360/cirNum;
				var centerR = 220;

				var Arr = [];
				for ( var i = 0; i < cirNum; i++ ) {  //找到小圆圆心点
					var cirX = Math.cos(i*angleNum*Math.PI/180) * centerR + centerX;
					var cirY = Math.sin(i*angleNum*Math.PI/180) * centerR + centerY;
					Arr.push([cirX,cirY]);
				}


				for ( var i = 0; i < cirNum; i++ ) { //创建circle画圆标签，两个圆
					var cir = createTag('circle',{'cx':Arr[i][0],'cy':Arr[i][1],'r':'2','fill':'white'});

					var cir2 = createTag('circle',{'cx':Arr[i][0],'cy':Arr[i][1],'r':'22','fill':'transparent','stroke':'transparent','stroke_width':'2','cursor':'pointer'});


					svg.appendChild(cir);

					svg.appendChild(cir2);
				}


				var cir1 = document.querySelectorAll('circle:nth-child(even)');

				var cir2 = document.querySelectorAll('circle:nth-child(odd)');

				for ( var i = 0; i < cir1.length; i++ ) {
					cir1[i].index = i;
					cir2[i].index = i;
					cir1[i].onmouseover = function () {
						cir2[this.index].setAttribute('r','3');
						this.setAttribute('stroke','white');
						change(this,22,30);
					}
					cir1[i].onmouseout = function () {
						change(this,30,22);
						this.setAttribute('fill','transparent');
						this.setAttribute('stroke','transparent');
						cir2[this.index].setAttribute('r','2');
					}
					cir1[i].onclick = function(){
						off = false;
						n = this.index;
						desc.innerHTML = '';
						for ( var i = 0; i < cir1.length; i++ ) {
							svg.removeChild(cir1[i]);
							svg.removeChild(cir2[i]);
						}
						document.body.style.background = arrColor[n];
						for ( var j = 0; j < arr[n].length; j++ ) {
							shard[j].style.webkitClipPath = arr[n][j].poly;
							shard[j].style.backgroundColor = arr[n][j].bc;
							if(arr[n][j].animat){
								shard[j].style.animation = arr[n][j].animat;
							}
						}
						for(var i = 0;i<shadow.children.length;i++){
							shadow.children[i].style.width = arrshadow[n][i].width;
							shadow.children[i].style.height = arrshadow[n][i].height;
							shadow.children[i].style.position = arrshadow[n][i].pos;
							shadow.children[i].style.left = arrshadow[n][i].left;
							shadow.children[i].style.bottom = arrshadow[n][i].bottom;
							shadow.children[i].style.borderRadius = arrshadow[n][i].border;
							shadow.children[i].style.backgroundImage = arrshadow[n][i].gradient;
						}
					};
				}

			//	封装弹性变化的函数
				function change(obj,r1,r2) {
					var nowR = r1;
					var overR = r2;
					obj.speed = 0;
					clearInterval(obj.timer);
					obj.timer = setInterval(function () {
						obj.speed += (overR - nowR)/6;
						obj.speed *= 0.9;
						if (Math.abs(overR - nowR)<=1 && Math.abs(obj.speed)<=1) {
							obj.setAttribute('r',overR);
							clearInterval(obj.timer);
						} else {
							nowR += obj.speed;
							obj.setAttribute('r',nowR);
						}
					},30)
				}
		}
		on = false;
		document.onclick = null;
	}
	function fn1(ev){  //滚轮事件，
		var down;
		if(!onOff||on){
			return;
		}
		if(off){
			return;
		}
		clearInterval(timer);
		down = ev.wheelDelta> 0 ? true : false;
		if(down){  //上
			img.style.display = 'none';
			for(var j = 0;j < 30;j++){
				shard[j].style.animation = '';
			}
			if(n<=0){ //0 1 2 3
				n = arr.length;
			}
			n--;
			document.body.style.background = arrColor[n];
			for ( var j = 0; j < arr[n].length; j++ ) {
				shard[j].style.webkitClipPath = arr[n][j].poly;
				shard[j].style.backgroundColor = arr[n][j].bc;
				if(arr[n][j].animat){
					shard[j].style.animation = arr[n][j].animat;
				}
			}

			if(n+1<=arr.length-1&&arr[n+1].length>30){
				for(var i = 30;i<arr[n+1].length/*-1*/;i++){
					shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
				}
			}
		}else{  //下
			img.style.display = 'none';
			document.body.style.background = '#999';
			for(var j = 0;j < 30;j++){
				shard[j].style.animation = '';
			}
			n++
			if(n>arr.length-1){ //0 1 2 3
				n = 0;
			}
			document.body.style.background = arrColor[n];
			for ( var j = 0; j < arr[n].length; j++ ) {
				shard[j].style.webkitClipPath = arr[n][j].poly;
				shard[j].style.backgroundColor = arr[n][j].bc;
				if(arr[n][j].animat){
					shard[j].style.animation = arr[n][j].animat;
				}
			}

			if(n-1>=0&&arr[n-1].length>30){
				for(var i = 30;i<arr[n-1].length/*-1*/;i++){
					shard[i].style.webkitClipPath = "polygon(50% 50%, 50% 50%, 50% 50%)";
				}
			}
			}
		ev.preventDefault();
	}
	var w = document.body.offsetWidth;
	var h = document.body.offsetHeight;

	window.onresize = function () {  //窗口变换的时候自适应
		w = document.body.offsetWidth;
		h = document.body.offsetHeight;
		if(resize){
			load.style.width = w * 0.55 + 'px';
			load.style.heigth = h * 0.8 + 'px';
		}
	};
	var load = document.querySelector('.wrap');
	var img = document.querySelector('.wrap img')

	var shard = document.getElementsByClassName('shard');

	for ( var j = 0; j < arrLoad[0].length; j++ ) {   //圆
		shard[j].style.webkitClipPath = arrLoad[0][j].poly;
		shard[j].style.backgroundColor = arrLoad[0][j].bc;
	}

	setTimeout(function () {
		for ( var i = 0; i < 30; i++ ) {
			shard[i].style.background = 'darkred';
		}
		setTimeout(function () {
			mTween(load,{width: 400, height: 400},500,'linear',function () {  //圆放大，然后散开
				for ( var j = 0; j < arrLoad[2].length; j++ ) {
					shard[j].style.webkitClipPath = arrLoad[2][j].poly;
					shard[j].style.backgroundColor = arrLoad[2][j].bc;
				}

				mTween(load,{width: w*0.55,height: h*0.8},500,'linear',function () {  //宽高变化，组成loge
					load.id = '';
					setTimeout(function () {
						setTimeout(function () {
							img.style.display = 'block';
							onOff = true;
						},2500);
						for ( var j = 0; j < arrLoad[1].length; j++ ) {
							shard[j].style.webkitClipPath = arrLoad[1][j].poly;
							shard[j].style.backgroundColor = arrLoad[1][j].bc;
						}
						resize = true;
					},5000)
				});
			});
		},1000)
	},4000)
})()
