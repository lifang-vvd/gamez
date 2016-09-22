var jinruyouxi=$(".jinruyouxi")[0]
var welcome=$(".welcome")[0]
var youxibeijing=$(".youxibeijing")[0]
var audio=document.getElementsByTagName("audio")[0];
jinruyouxi.onclick=function(){
    welcome.style.display="none"
            audio.play();

function game(){
	 this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
     this.imgs={A:"img/a.png",B:"img/b.png",C:"img/c.png",D:"img/D.png",E:"img/E.png",F:"img/F.png",G:"img/G.png",H:"img/H.png",I:"img/I.png",J:"img/J.png",K:"img/K.png",L:"img/L.png",M:"img/M.png",N:"img/N.png",O:"img/O.png",P:"img/P.png",Q:"img/Q.png",R:"img/R.png",S:"img/S.png",T:"img/T.png",U:"img/U.png",V:"img/V.png",W:"img/W.png",X:"img/X.png",Y:"img/Y.png",Z:"img/Z.png"}
     this.len=3
     this.currentletter=[]
     this.currentspan=[]
     this.cw=document.documentElement.clientWidth
     this.chh=document.documentElement.clientHeight
     this.t
     this.speed=1
     this.life=$(".life")[0]
     this.lifea=3
     this.guanqia=$(".guanqia")[0]
     this.guanqiaa=1
     this.fenshu=$(".fenshu")[0]
     this.fenshuu=0
     this.zongfenshu=$(".zongfenshu")[0]
     this.zongfenshuu=0
     this.guoguan=10
     this.xiayiguan=$(".xiayiguan")[0]

     this.youxijieshu=$(".youxijieshu")[0]





}
game.prototype={
	play:function(){

		this._createspan(this._getrand(this.len))
		this._move()
		this._key()
	},
_move:function(){
      var that=this

      that.t=setInterval(function(){
       for (var i = 0; i < that.currentspan.length; i++) {
       	var tops=that.currentspan[i].offsetTop+that.speed
       	that.currentspan[i].style.top=tops+"px"
       	if(tops>=that.chh){
       		document.body.removeChild(that.currentspan[i])
       		that.currentletter.splice(i,1)
            that.currentspan.splice(i,1)
            that._createspan(that._getrand(1))
            that.lifea--
            that.life.innerHTML=that.lifea
            console.log(that.lifea)
            if(that.lifea<=0){
                audio.pause();
              that.youxijieshu.style.display="block"
              
               clearInterval(that.t)
               that.youxijieshu.onclick=function(){
               that.youxijieshu.style.display="none"
               location.reload()
           }
           }
       	}
       };
      },50)
},
_key:function(){
 var that=this
   document.onkeydown=function(e){
var e=e||window.event
for (var i = 0; i < that.currentspan.length; i++) {
	var keyword=String.fromCharCode(e.keyCode)
	if(keyword==that.currentspan[i].values){
		document.body.removeChild(that.currentspan[i])
		that.currentletter.splice(i,1)
            that.currentspan.splice(i,1)
            that._createspan(that._getrand(1))
            that.zongfenshuu++
            that.zongfenshu.innerHTML=that.zongfenshuu
            that.fenshuu++
            that.fenshu.innerHTML=that.fenshuu
            if (that.fenshuu>=that.guoguan) {
            	that.guanqiaa++
            	that.guanqia.innerHTML=that.guanqiaa
            	that.xiayiguan.style.display="block"
              clearInterval(that.t)
                that.xiayiguan.onclick=function(){
               that.xiayiguan.style.display="none"
               that.next()
           }
            	
            };
	}
	
};
}
},
next:function(){
var that=this
clearInterval(that.t)
for (var i = 0; i < that.currentspan.length; i++) {
	document.body.removeChild(that.currentspan[i])
};
that.guoguan=that.guoguan+10
that.len++
that.speed++
that.fenshuu=0
that.fenshu.innerHTML=that.fenshuu
if(that.speed>8){
	that.speed=8
}
 if(that.num>10){
        that.num=10
    }
     that.currentletter=[]
     that.currentspan=[] 
     that._createspan(this._getrand(this.len))
		that._move()
		that._key() 
},
_getrand:function(num){
    var newarr=[]
for (var i = 0; i < num; i++) {
    		var lf=this.arr[Math.floor(Math.random()*this.arr.length)]
    	while(this._check(lf,this.currentletter)){
    lf=this.arr[Math.floor(Math.random()*this.arr.length)]
    		
    	}this.currentletter.push(lf)
        newarr.push(lf)
    	};  

       return newarr
    }, 

     _check:function(val,arr){
        for (var i = 0; i < arr.length; i++) {
        	if(arr[i]==val){
        		return true
        	}
        };return false
    },
	_createspan:function(arr2){
		var newarr=[]
		for (var i = 0; i < arr2.length; i++) {
	 var span=document.createElement("span")
     span.innerHTML="<img src="+this.imgs[arr2[i]]+" style=width:80px;height:100px;>"
     span.values=arr2[i]
     var  lefts=(100+Math.random()*(this.cw-200))
     span.lefts=lefts
     while(this._checkdifferent(span,this.currentspan)){
     	lefts=(100+Math.random()*(this.cw-200))
     span.lefts=lefts
     }
     	newarr.push(span)
     	this.currentspan.push(span)

	span.style.cssText="position:absolute;left:"+lefts+"px;top:"+(Math.random()*20-10)+"px"
    document.body.appendChild(span)
	};
	},
	_checkdifferent:function(ele,arr){
     for (var i = 0; i < arr.length; i++) {
     	if(ele.lefts>arr[i].lefts-42&&ele.lefts<arr[i].lefts+42){
     		return true
     	}
     };
     return false
}
}
var game=new game()
	game.play()
}