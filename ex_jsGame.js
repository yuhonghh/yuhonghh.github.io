//表示页面中的table, 这个table就是将要显示游戏的主面板 
var tbl; 
//游戏状态 0: 未开始;1 运行; 2 中止; 
var status = 0; 
//定时器, 定时器内将做moveDown操作 
var timer; 
//分数 
var score = 0; 

//area是一个18*10的数组,也和页面的table对应。初始时都为0, 如果被占据则为1 

var area = new Array(18); 
for(var i=0;i<18;i++){ 
	area[i] = new Array(10); 
} 
for(var i=0;i<18;i++){ 
	for(var j=0; j<10; j++){ 
		area[i][j] = 0; 
	} 
} 

//当前活动的方块, 它可以左右下移动, 变型。当它触底后, 将会更新area; 
var activeBlock; 
//生产方块形状, 有7种基本形状。 
function generateBlock(){ 
	activeBlock = null; 
	activeBlock = new Array(4); 
	//随机产生0-6数组，代表7种形态。
	var t = (Math.floor(Math.random()*20)+1)%7; 
	switch(t){ 
		case 0:{ //正方形
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:0, y:5}; 
			activeBlock[3] = {x:1, y:5}; 

			break; 
		} 
		case 1:{ //長條 ____
			activeBlock[0] = {x:0, y:3}; 
			activeBlock[1] = {x:0, y:4}; 
			activeBlock[2] = {x:0, y:5}; 
			activeBlock[3] = {x:0, y:6}; 
			break; 
		} 
		case 2:{ //|-|
			activeBlock[0] = {x:0, y:5}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:2, y:4}; 
			break; 
		} 
		case 3:{ //|-|
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:2, y:5}; 
			break; 
		} 
		case 4:{ //長條|____
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:1, y:6}; 
			break; 
		} 
		case 5:{ //L
			activeBlock[0] = {x:0, y:4}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:2, y:4}; 
			activeBlock[3] = {x:2, y:5}; 
			break; 
		} 
		case 6:{ //_|_
			activeBlock[0] = {x:0, y:5}; 
			activeBlock[1] = {x:1, y:4}; 
			activeBlock[2] = {x:1, y:5}; 
			activeBlock[3] = {x:1, y:6}; 
			break; 
		} 
	} 
	//检查刚生产的四个小方格是否可以放在初始化的位置. 
	for(var i=0; i<4; i++){ 
		if(!isCellValid(activeBlock[i].x, activeBlock[i].y)){     //if(area[x][y]==1){ return false; } 格子若被占据，isCellValid为false
				return false; 
			} 
		} 
	return true; 
} 
//向下移动 
function moveDown(){ 
	//检查底边界. 
	if(checkBottomBorder()){ 
		//没有触底, 则擦除当前图形, 
		erase(); 
		//更新当前图形坐标 
		for(var i=0; i<4; i++){ 
			activeBlock[i].x = activeBlock[i].x + 1; 
		} 
		//重画当前图形 
		paint(); 
	} 
	//触底, 
	else{ 
		//停止当前的定时器, 也就是停止自动向下移动. 
		clearInterval(timer); 
		//更新area数组. 
		updatearea(); 
		//消行 
		var lines = deleteLine(); 
		//如果有消行, 则 
		if(lines!=0){ 
			//更新分数 
			score = score + lines*10; 
			updateScore(); 
			//擦除整个面板 
			erasearea(); 
			//重绘面板 
			paintarea(); 
		} 
		//产生一个新图形并判断是否可以放在最初的位置. 
		if(!generateBlock()){ 
			alert("Game over!"); 
			status = 2; 
			return; 
		} 
		paint(); 
		//定时器, 每隔一秒执行一次moveDown 
		timer = setInterval(moveDown,1000) 
	} 
} 
//左移动 
function moveLeft(){ 
	if(checkLeftBorder()){ 
		erase(); 
		for(var i=0; i<4; i++){ 
			activeBlock[i].y = activeBlock[i].y - 1; 
		} 
		paint(); 
		} 
	} 
	//右移动 
function moveRight(){ 
	if(checkRightBorder()){ 
		erase(); 
		for(var i=0; i<4; i++){ 
			activeBlock[i].y = activeBlock[i].y + 1; 
		} 
		paint(); 
	} 
} 
//旋转, 因为旋转之后可能会有方格覆盖已有的方格. 
//先用一个tmpBlock,把activeBlock的内容都拷贝到tmpBlock, 
//对tmpBlock尝试旋转, 如果旋转后检测发现没有方格产生冲突,则 
//把旋转后的tmpBlock的值给activeBlock. 
function rotate(){ 
	var tmpBlock = new Array(4); 
	for(var i=0; i<4; i++){ 
		tmpBlock[i] = {x:0, y:0}; 
	} 
	for(var i=0; i<4; i++){ 
		tmpBlock[i].x = activeBlock[i].x; 
		tmpBlock[i].y = activeBlock[i].y; 
	} 
	//先算四个点的中心点，则这四个点围绕中心旋转90度。 
	var cx = Math.round((tmpBlock[0].x + tmpBlock[1].x + tmpBlock[2].x + tmpBlock[3].x)/4); 
	var cy = Math.round((tmpBlock[0].y + tmpBlock[1].y + tmpBlock[2].y + tmpBlock[3].y)/4); 
	//旋转的主要算法. 可以这样分解来理解。 
	//先假设围绕源点旋转。然后再加上中心点的坐标。 

	for(var i=0; i<4; i++){ 
		tmpBlock[i].x = cx+cy-activeBlock[i].y; 
		tmpBlock[i].y = cy-cx+activeBlock[i].x; 
	} 
	//检查旋转后方格是否合法. 
	for(var i=0; i<4; i++){ 
	if(!isCellValid(tmpBlock[i].x,tmpBlock[i].y)){ 
		return; 
	} 
} 
//如果合法, 擦除 
erase(); 
//对activeBlock重新赋值. 
for(var i=0; i<4; i++){ 
	activeBlock[i].x = tmpBlock[i].x; 
	activeBlock[i].y = tmpBlock[i].y; 
} 
//重画. 
paint(); 
} 
//检查左边界,尝试着朝左边移动一个,看是否合法。
function checkLeftBorder(){ 
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].y==0){  //y已经到边界
			return false; 
		} 
		if(!isCellValid(activeBlock[i].x, activeBlock[i].y-1)){ //格子若被占据，isCellValid为false
			return false; 
		} 
	} 
	return true; 
} 
//检查右边界,尝试着朝右边移动一个,看是否合法。
function checkRightBorder(){ 
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].y==9){ //y已经到边界
			return false; 
		} 
		if(!isCellValid(activeBlock[i].x, activeBlock[i].y+1)){ //格子若被占据，isCellValid为false
			return false; 
		} 
	} 
	return true; 
} 
//检查底边界,尝试着朝下边移动一个,看是否合法。
function checkBottomBorder(){ 
	for(var i=0; i<activeBlock.length; i++){ 
		if(activeBlock[i].x==17){  //触底
			return false; 
		} 
		if(!isCellValid(activeBlock[i].x+1, activeBlock[i].y)){ //碰到已经被占据的格子
			return false; 
		} 
	} 
	return true; 
} 
//检查坐标为(x,y)的是否在area种已经存在, 存在说明这个方格不合法。
function isCellValid(x, y){ 
	if(x>17||x<0||y>9||y<0){ 
		return false; 
	} 
	if(area[x][y]==1){ 
		return false; 
	} 
	return true; 
} 
//擦除 
function erase(){ 
	for(var i=0; i<4; i++){ 
		tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor="white"; 
	} 
} 
//绘活动图形 
function paint(){ 
	for(var i=0; i<4; i++){ 
		tbl.rows[activeBlock[i].x].cells[activeBlock[i].y].style.backgroundColor="#CC3333"; 
	} 
} 
//更新area数组 
function updatearea(){ 
	for(var i=0; i<4; i++){ 
		area[activeBlock[i].x][activeBlock[i].y]=1; 
	} 
} 
//消行 
function deleteLine(){ 
	var lines = 0; 
	for(var i=0; i<18; i++){ 
		var j=0; 
		for(; j<10; j++){ 
			if(area[i][j]==0){ 
				break; 
		} 
	} 
	if(j==10){ 
		lines++; 
		if(i!=0){ 
			for(var k=i-1; k>=0; k--){ 
				area[k+1] = area[k]; 
			} 
		} 
		area[0] = generateBlankLine(); 
		} 
	} 
	return lines; 
} 
//擦除整个面板 
function erasearea(){ 
	for(var i=0; i<18; i++){ 
		for(var j=0; j<10; j++){ 
			tbl.rows[i].cells[j].style.backgroundColor = "white"; 
		} 
	} 
} 
//重绘整个面板 
function paintarea(){ 
	for(var i=0;i<18;i++){ 
		for(var j=0; j<10; j++){ 
			if(area[i][j]==1){ 
				tbl.rows[i].cells[j].style.backgroundColor = "#CC3333"; 
			} 
		} 
	} 
} 
//产生一个空白行. 
function generateBlankLine(){ 
	var line = new Array(10); 
	for(var i=0; i<10; i++){ 
		line[i] = 0; 
	} 
	return line; 
} 
//更新分数 
function updateScore(){ 
	document.getElementById("score").innerText=" " + score; 
} 
//键盘控制 
function keyControl(){ 
	if(status!=1){ 
		return; 
	} 
	var code = event.keyCode; 
	switch(code){ 
		case 37:{ 
			moveLeft(); 
			break; 
		} 
		case 38:{ 
			rotate(); 
			break; 
		} 
		case 39:{ 
			moveRight(); 
			break; 
		} 
		case 40:{ 
			moveDown(); 
			break; 
		} 
	} 
} 
//开始 
function begin(e){ 
	e.disabled = true; 
	status = 1; 
	tbl = document.getElementById("area"); 
	if(!generateBlock()){ 
		alert("Game over!"); 
		status = 2; 
		return; 
	} 
	paint(); 
	timer = setInterval(moveDown,1000); 
} 
document.onkeydown=keyControl; 