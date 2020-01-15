var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//for (var i = 0; i < 100; i++) {
//	var x = Math.random() * window.innerWidth;
//	var y = Math.random() * window.innerHeight;
//	c.beginPath();
//	c.arc(x, y, 30, 0, Math.PI * 2, false
//		);
//	c.strokeStyle = 'blue';
//	c.stroke();
//}
var sprites=[], targets=[];
function startGame() {
   myApp.start();
   for(var i=1; i<=3; i++)
   {
      sprites[i]=new sprite('assets/a_0'+i+'.png',1120,i*220); 
      targets[i]=new sprite('assets/b_0'+i+'.png',i*220,250);      
      dragable(sprites[i],targets[i]);
   }  
   
   
   for(var i=4; i<=6; i++)
   {
      sprites[i]=new sprite('assets/a_0'+i+'.png',900,(i-3)*220); 
      targets[i]=new sprite('assets/b_0'+i+'.png',(i-3)*220,470);      
      dragable(sprites[i],targets[i]);
   }  
 
    for(var i=7; i<=9; i++)
   {
      sprites[i]=new sprite('assets/a_0'+i+'.png',1340,(i-6)*220); 
      targets[i]=new sprite('assets/b_0'+i+'.png',(i-6)*220,690);      
      dragable(sprites[i],targets[i]);
   }  
 

}
var myApp = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1800;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);  
        this.interval = setInterval(appLoop, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
'#E74C3C',
'#5F6A6A',
'#F39C12',
'#F4D03F',
'#884EA0',
]

window.addEventListener('mousemove', 
    function(event){
   mouse.x = event.x;
   mouse.y = event.y;
   
})

function Circle(x, y, dx, dy, radius) {
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.radius = radius;
     this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

     this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius,0, Math.PI * 2, 
    	false);
    c.fillStyle = this.color;
    c.fill();
     }
     this.update = function() {
    if (this.x + this.radius > innerWidth || 
        this.x - this.radius
    	< 0) {
    	this.dx = -this.dx;
    }

    if (this.y+ this.radius > innerHeight || 
        this.y - this.radius <0) {
    	this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
     

    //interaktifitas
    if (mouse.x - this.x <50 && mouse.x 
        - this.x > -50 && mouse.y - this.y < 50
        && mouse.y - this.y > -50) {
        if(this.radius < maxRadius) {
            this.radius += 1;
        }
    } else if (this.radius > minRadius) {
        this.radius -= 1;
    }
     
     this.draw()
     }
}
function sprite(url,x,y)
{
    this.x=x;
    this.y=y;
    this.width=200;
    this.height=200;
    var ctx=myApp.context;
    var imgObject= new Image();
    imgObject.src = url; 
    ctx.drawImage(imgObject,this.x,this.y);   
    this.update=function()
    {
        ctx.drawImage(imgObject,this.x,this.y);   
    }
   
}

function appLoop()
{
    myApp.clear();    
    for(var i=1; i<=3;i++)
    {
        targets[i].update();
        //sprites[i].update();
    }
  for(var i=4; i<=6;i++)
    {
        targets[i].update();
        //sprites[i].update();
    }
  for(var i=7; i<=9;i++)
    {
        targets[i].update();
        //sprites[i].update();
    }

  for(var i=1; i<=3;i++)
    {
        //targets[i].update();
        sprites[i].update();
    }
  for(var i=4; i<=6;i++)
    {
        //targets[i].update();
        sprites[i].update();
    }
  for(var i=7; i<=9;i++)
    {
        //targets[i].update();
        sprites[i].update();
    }
}

function dragable(sprite,target)
{
    var offsetX, offsetY;
    document.body.addEventListener('mousedown',function(e)
    {      
        offsetX=e.offsetX-sprite.x;
        offsetY=e.offsetY-sprite.y;
        //mendeteksi pointer klik diatas objek lewat fungsi mouseIsOver
        if(mouseIsOver(e.offsetX,e.offsetY,sprite))
        {
          //jika klik diatas objek, deteksi pergerakan mouse dan kondisi saat mouse lepas
          //panggil fungsi mouseMove saat pointer bergerak
          document.body.addEventListener('mousemove',mouseMove);
          //panggil fungsi mouseUp saat pointer lepas
          document.body.addEventListener('mouseup',mouseUp);
        }     
    });  
    function mouseMove(e)
    {
      //gambar objek baru lewat fungsi draw() dengan posisi x dan y sama dengan posisi x dan y pointer
      //menambahkan faktor offset agar posisi drag objek tidak bergeser
      sprite.x=e.offsetX-offsetX, sprite.y=e.offsetY-offsetY;     
    };
    function mouseUp(e)
    {
      //hapus event untuk mousemove dan mouseup agar kondisi kembali seperti semula
      document.body.removeEventListener('mousemove',mouseMove);
      document.body.removeEventListener('mouseup',mouseUp);
      calculateDistance();
    }
    //fungsi untuk mendeteksi posisi pointer diatas objek
    function mouseIsOver (mouseX,mouseY,obj)
    {
      if(mouseX>obj.x && mouseX < obj.x+obj.width && mouseY > obj.y && mouseY<obj.y+obj.height)
      return true;
      else return false;
    }
    //menghitung jarak antara sprite dengan target
    function calculateDistance()
    {
        var dist=Math.sqrt(((sprite.x-target.x)*(sprite.x-target.x))+((sprite.y-target.y)*(sprite.y-target.y)));       
        if(dist<30){
          sprite.x=target.x;
          sprite.y=target.y;
        }
    }
}


var circleArray = [];

for (var i = 0; i < 1000; i++) {
var radius = Math.random() * 3 + 1;
var x = Math.random()* (innerWidth - radius *2) + radius;
var y = Math.random()* (innerHeight - radius *2) + radius;
var dx = (Math.random() - 0.5);
var dy = (Math.random() - 0.5);

circleArray.push(new Circle(x, y, dx, dy, radius));
   
}



function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight
		);
	
	for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


    
}
animate();
startGame();
