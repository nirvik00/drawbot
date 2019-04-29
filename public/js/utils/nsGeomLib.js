
var nsPt=function(x,y,z){
    this.name="POINT";
    this.x=x; //for 3d-viewer
    this.y=y; //for 3d-viewer
    this.z=z; //for 3d-viewer

    this.cx=x; //for canvas
    this.cy=y; //for canvas
    this.cLe=50; //for canvas
    this.cWi=50; //for canvas
    this.selected=false; //slected in canvas

    this.p=new THREE.Vector3(this.x,this.y,this.z);
    this.r=0.20;
    this.mesh;
    this.geo;
    this.mat;
    this.generateGeometry3d=function(){   
        var x,y,z;
        if(this.x===0 && this.y===0 && this.z===0){
            x=Math.random()*2;
            y=Math.random()*2;
            z=0;
        }
        this.geo=new THREE.SphereBufferGeometry(this.r,10,10);
        this.mat=new THREE.MeshBasicMaterial({
            color: 0xff01000
        });
        this.mesh=new THREE.Mesh(this.geo,this.mat);
        this.mesh.position.x=x;
        this.mesh.position.y=y;
        this.mesh.position.z=z;
        scene.add(this.mesh);
    }
    this.generateNodeGeom=function(){//first when coords =0
        if(this.cx===0 && this.cy===0){
            this.cx=Math.random()*100+20;
            this.cy=Math.random()*100+20;
        }
        CANVASCONTEXT.globalAlpha=0.2;
        CANVASCONTEXT.fillStyle="rgb(255,0,0,100)";
        CANVASCONTEXT.fillRect(this.cx,this.cy,this.cLe, this.cWi);
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="rgb(0,0,0)";
        CANVASCONTEXT.strokeRect(this.cx,this.cy,this.cLe,this.cWi);
    }
    this.drawNodeGeom=function(){ //after dragging
        CANVASCONTEXT.globalAlpha=0.2;
        CANVASCONTEXT.fillStyle="rgb(255,0,0,100)";
        CANVASCONTEXT.fillRect(this.cx,this.cy,this.cLe, this.cWi);
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="rgb(0,0,0)";
        CANVASCONTEXT.strokeRect(this.cx,this.cy,this.cLe,this.cWi);
    }

    this.contains=function(mx, my){
        if(mx>this.cx && mx<this.cx+this.cLe && my>this.cy && my<this.cy+this.cWi){
            return true;
        }
        return false;
    }
}

var nsLine=function(p,q){
    this.name="LINE";
    this.P=p;
    this.Q=q;
    this.mesh;
    this.cx=0; //for canvas
    this.cy=0; //for canvas
    this.cLe=50; //for canvas
    this.cWi=50; //for canvas
    this.selected=false; //for canvas
    this.generateGeometry3d=function(){
        if(p.x===0 && p.y===0 && p.z===0 && q.x===0 && q.y===0 && q.z===0){
            p.x=Math.random()*5;
            p.y=Math.random()*5;
            p.z=Math.random()*2;
            q.x=Math.random()*5;
            q.y=Math.random()*5;
            q.z=Math.random()*5;
        }
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(p.x,p.y,p.z));
        geo.vertices.push(new THREE.Vector3(q.x,q.y,q.z));
        var mat=new THREE.LineBasicMaterial({ 
               color: new THREE.Color("rgb(0,0,255)") 
        });
        this.mesh= new THREE.Line( geo, mat);
        scene.add(this.mesh);
    }
    this.generateNodeGeom=function(){
        if(this.cx===0 && this.cy===0){
            this.cx=Math.random()*100+20;
            this.cy=Math.random()*100+20;
        }else{
            x=this.cx;
            y=this.cy;
        }
        CANVASCONTEXT.globalAlpha=0.2;
        CANVASCONTEXT.fillStyle="rgb(0,0,255)";
        CANVASCONTEXT.fillRect(this.cx,this.cy,this.cLe, this.cWi);
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="rgb(0,0,0)";
        CANVASCONTEXT.strokeRect(this.cx,this.cy,this.cLe, this.cWi);
    }
    this.drawNodeGeom=function(){ //after dragging
        CANVASCONTEXT.globalAlpha=0.2;
        CANVASCONTEXT.fillStyle="rgb(255,0,0,100)";
        CANVASCONTEXT.fillRect(this.cx,this.cy,this.cLe, this.cWi);
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="rgb(0,0,0)";
        CANVASCONTEXT.strokeRect(this.cx,this.cy,this.cLe,this.cWi);
    }
    this.contains=function(mx, my){
        if(mx>this.cx && mx<this.cx+this.cLe && my>this.cy && my<this.cy+this.cWi){
            return true;
        }
        return false;
    }

}


var Di=function(a,b){
    return Math.sqrt(Math.pow((a.x-b.x),2)+ Math.pow((a.y-b.y),2)+Math.pow((a.z-b.z),2));
}