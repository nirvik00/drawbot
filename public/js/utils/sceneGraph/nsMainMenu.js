
var genGeo2dMainMenu=function(ctx){
    this.X=0;
    this.Y=0;
    this.L=120;
    this.W=50;
    this.colr="rgb(0,0,0)";
    this.ctx=ctx;
    this.mouseover=false;
    this.mousedown=false;

    this.hover=function(x, y){
        if(x>this.X && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mouseover=true;
        }else{
            this.mouseover=false;
        }        
    }
    this.selected=function(x, y){
        if(x>this.X && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mousedown=true;
        }else{
            this.mousedown=false;
        }        
    }
    this.display=function(){
        var hover=this.mouseover;
        var sel=this.mousedown;        
        if(hover===true && sel===false){
            this.colr="rgb(155,50,50)";
        }
        else if(sel===true){
            this.colr="rgb(255,0,0)";
        }else{
            this.colr="rgb(0,0,0)";
        } 
        this.ctx.font="20px Arial";
        this.ctx.fillStyle=this.colr;
        this.ctx.fillRect(this.X,this.Y,this.L,this.W);
        this.ctx.fillStyle="rgb(255,255,255)";
        this.ctx.fillText("Geometry", this.X+15, this.Y+30); 
    }
}


var genAlgMainMenu=function(ctx){
    this.X=130;
    this.Y=0;
    this.L=120;
    this.W=50;
    this.colr="rgb(0,0,0)";
    this.ctx=ctx;
    this.mouseover=false;
    this.mousedown=false;

    this.hover=function(x, y){
        if(x>this.X+25 && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mouseover=true;
        }else{
            this.mouseover=false;
        }        
    }
    this.selected=function(x, y){
        if(x>this.X+25 && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mousedown=true;
        }else{
            this.mousedown=false;
        }        
    }
    this.display=function(){
        var hover=this.mouseover;
        var sel=this.mousedown;        
        if(hover===true && sel===false){
            this.colr="rgb(155,50,50)";
        }
        else if(sel===true){
            this.colr="rgb(255,0,0)";
        }else{
            this.colr="rgb(0,0,0)";
        } 
        this.ctx.font="20px Arial";
        this.ctx.fillStyle=this.colr;
        this.ctx.fillRect(this.X,this.Y,this.L,this.W);
        this.ctx.fillStyle="rgb(255,255,255)";
        this.ctx.fillText("Algorithms", this.X+12, this.Y+30); 
    }
}


var aiMenu=function(ctx){
    this.X=270;
    this.Y=0;
    this.L=120;
    this.W=50;
    this.colr="rgb(0,0,0)";
    this.ctx=ctx;
    this.mouseover=false;
    this.mousedown=false;

    this.hover=function(x, y){
        if(x>this.X+25 && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mouseover=true;
        }else{
            this.mouseover=false;
        }        
    }
    this.selected=function(x, y){
        if(x>this.X+25 && x<this.X+this.L+25 && y>this.Y && y<this.Y+this.W+25){
            this.mousedown=true;
        }else{
            this.mousedown=false;
        }        
    }
    this.display=function(){
        var hover=this.mouseover;
        var sel=this.mousedown;        
        if(hover===true && sel===false){
            this.colr="rgb(155,50,50)";
        }
        else if(sel===true){
            this.colr="rgb(255,0,0)";
        }else{
            this.colr="rgb(0,0,0)";
        } 
        this.ctx.font="20px Arial";
        this.ctx.fillStyle=this.colr;
        this.ctx.fillRect(this.X,this.Y,this.L,this.W);
        this.ctx.fillStyle="rgb(255,255,255)";
        this.ctx.fillText("AI", this.X+50, this.Y+30); 
    }
}