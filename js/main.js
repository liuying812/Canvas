	var yyy = document.getElementById('xxx');
  		var context = yyy.getContext('2d');

  		//先设置画布大小
  		autoSetCanvasSize(yyy)  

      var lineWidth = 3;

      var eraserEnabled = false;
      pen.onclick = function(){
          eraserEnabled = false;
          pen.classList.add('active') 
          eraser.classList.remove('active')
      }		

      eraser.onclick = function(){
          eraserEnabled = true;
          eraser.classList.add('active')
          pen.classList.remove('active') 
      } 

      qingkong.onclick = function(){
        context.clearRect(0, 0, yyy.width, yyy.height)
      }

      xiazai.onclick = function(){
        var url = yyy.toDataURL("image/png")
        var a = document.createElement('a')
        a.href = url
        a.download = '我的作品'
        a.target = '_blank'
        a.click()
      }

      black.onclick = function(){
        context.strokeStyle = 'black'
        black.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        yellow.classList.remove('active')
      }
      red.onclick = function(){
        context.strokeStyle = 'red'
        red.classList.add('active')
        black.classList.remove('active')
        green.classList.remove('active')
        yellow.classList.remove('active')
      }
      green.onclick = function(){
        context.strokeStyle = 'green'
        green.classList.add('active')
        red.classList.remove('active')
        black.classList.remove('active')
        yellow.classList.remove('active')
      }
      yellow.onclick = function(){
        context.strokeStyle = 'yellow'
        yellow.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        black.classList.remove('active')
      }


      thin.onclick = function(){
        lineWidth = 3
      }

      thick.onclick = function(){
        lineWidth = 6
      }

      //特性检测
      if(document.body.ontouchstart !== undefined){
          //触屏设备
          listenTouch(yyy);

      }else{
         //非触屏设备
          listenMouse(yyy)
      }

      //触摸事件
      function listenTouch(yyy){

        var painting = false
        var lastPoint = {x: undefined, y:undefined}

        //开始摸了
        yyy.ontouchstart = function(a){
          var x = a.touches[0].clientX;
          var y = a.touches[0].clientY;
        
          painting = true;
        
          if(eraserEnabled){
            context.clearRect(x-5, y-5, 10, 10);
          }else {
            lastPoint = {"x":x, "y":y}
          } 
        }

        //摸着移动
        yyy.ontouchmove = function(a){
          var x = a.touches[0].clientX;
          var y = a.touches[0].clientY;
        
          if(!painting){ return; }
          if(eraserEnabled){
              context.clearRect(x-5, y-5, 10, 10);
          }else{

            var newPoint = {"x":x, "y":y}
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          
            lastPoint = newPoint;//最新点更新成上一个点  
            
          }
        }

        //不摸了
        yyy.ontouchend = function(a){
           painting = false;
        }
      }

  		//鼠标事件
  		function listenMouse(yyy){

  		  var painting = false
  		  var lastPoint = {x: undefined, y:undefined}

  		  //按下
  		  yyy.onmousedown = function(a){
  		    var x = a.clientX;
  		    var y = a.clientY;
  		  
  		    painting = true;
  		  
  		    if(eraserEnabled){
  		      context.clearRect(x-5, y-5, 10, 10);
  		    }else {
  		      lastPoint = {"x":x, "y":y}
  		    } 
  		  }

  		  //移动
  		  yyy.onmousemove = function(a){
  		    var x = a.clientX;
  		    var y = a.clientY;
  		  
  		    if(!painting){ return; }
  		    if(eraserEnabled){
  		        context.clearRect(x-5, y-5, 10, 10);
  		    }else{

  		      var newPoint = {"x":x, "y":y}
  		      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
  		    
  		      lastPoint = newPoint;//最新点更新成上一个点  
  		      
  		    }
  		  }

  		  //松开
  		  yyy.onmouseup = function(a){
  		     painting = false;
  		  }
  		}


  		//画线
  		function drawLine(x1, y1, x2, y2){
  		    context.beginPath();
  		    context.moveTo(x1, y1) //起点
  		    context.lineWidth = lineWidth
  		    context.lineTo(x2, y2) //终点
  		    context.stroke()
  		    context.closePath()
  		 
  		}

  		//自动设置canvas尺寸和窗口大小一致
  		function autoSetCanvasSize(canvas){
  		  getPageWH(canvas);

  		  //窗口大小发生改变时
  		  window.onresize = function(canvas){
  		    getPageWH();
  		  }
  		  
  		  //让canvas的宽高等于窗口宽高
  		  function getPageWH(){
  		    var pageWidth =   document.documentElement.clientWidth;
  		    var pageHeight = document.documentElement.clientHeight;
  		    canvas.width = pageWidth;
  		    canvas.height = pageHeight;  
  		  }
  		}