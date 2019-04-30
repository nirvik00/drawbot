
var nsPt=function(x,y,z){
    this.name="POINT";
    this.x=x; //for 3d-viewer
    this.y=y; //for 3d-viewer
    this.z=z; //for 3d-viewer
    this.id=0;
    this.cx=x; //for canvas
    this.cy=y; //for canvas
    this.cLe=50; //for canvas
    this.cWi=50; //for canvas
    this.cr=20;//inner radius
    this.cR=40;//outer radius

    this.selected=false; //slected in canvas

    this.p=new THREE.Vector3(this.x,this.y,this.z);
    this.r=0.20;
    this.mesh;
    this.geo;
    this.mat;
    this.colr="rgb(255,0,0)";

    this.generateGeometry3d=function(){   
        try{
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            scene.remove(this.mesh);
        }catch(e){
            console.log("gen point");
        }
        if(this.x===0 && this.y===0 && this.z===0){
            this.x=Math.random()*2+3;
            this.y=Math.random()*2+3;
            this.z=0;
        }
        this.geo=new THREE.SphereBufferGeometry(this.r,10,10);
        this.mat=new THREE.MeshBasicMaterial({
            color: new THREE.Color("rgb(255,0,0)")
        });
        var mesh=new THREE.Mesh(this.geo,this.mat);
        mesh.position.x=this.x;
        mesh.position.y=this.y;
        mesh.position.z=this.z;
        scene.add(mesh);
        this.mesh=mesh;
    }    
}

var nsLine=function(p,q){
    this.name="LINE";
    this.p=p;
    this.q=q;
    this.mesh;
    this.id=0;
    this.cx=0; //for canvas
    this.cy=0; //for canvas
    this.cLe=50; //for canvas
    this.cWi=50; //for canvas
    this.cr=20;//inner radius
    this.cR=40;//outer radius
    this.colr="rgb(0,0,255)"; //color

    this.selected=false; //for canvas

    this.generateGeometry3d=function(){
        try{
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            scene.remove(this.mesh);
        }catch(e){
            console.log("gen point");
        }
        if(this.p.x===0 && this.p.y===0 && this.p.z===0 && this.q.x===0 && this.q.y===0 && this.q.z===0){
            this.p.x=Math.random()*5;
            this.p.y=Math.random()*5;
            this.p.z=Math.random()*2;
            this.q.x=Math.random()*5;
            this.q.y=Math.random()*5;
            this.q.z=Math.random()*5;
        }
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(this.p.x,this.p.y,this.p.z));
        geo.vertices.push(new THREE.Vector3(this.q.x,this.q.y,this.q.z));
        var mat=new THREE.LineBasicMaterial({ 
               color: new THREE.Color("rgb(0,0,255)") 
        });
        this.mesh= new THREE.Line( geo, mat);
        scene.add(this.mesh);
    }
}

var initNodeGeom=function(obj){
    if(obj.cx<1 && obj.cy<1){
        obj.cx=Math.random()*400+20;
        obj.cy=Math.random()*400+20;
    }
    drawNodeGeom(obj);
}
var drawNodeGeom=function(obj){ //after dragging
    //outer circle
    CANVASCONTEXT.globalAlpha=0.2;
    CANVASCONTEXT.fillStyle=obj.colr;
    CANVASCONTEXT.beginPath();
    CANVASCONTEXT.arc(obj.cx+obj.cLe/2, obj.cy+obj.cWi/2, obj.cR, 0, 2*Math.PI);
    CANVASCONTEXT.fill();
    //inner circle
    CANVASCONTEXT.globalAlpha=0.50;
    CANVASCONTEXT.fillStyle=obj.colr;
    CANVASCONTEXT.beginPath();
    CANVASCONTEXT.arc(obj.cx+obj.cLe/2, obj.cy+obj.cWi/2, obj.cr, 0, 2*Math.PI);
    CANVASCONTEXT.fill(); 

    ////if selected: draw grid alignment lines
    if(obj.selected===true){
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="grey";
        CANVASCONTEXT.lineWidth = 1;
        CANVASCONTEXT.beginPath();
        CANVASCONTEXT.moveTo(obj.cx+obj.cLe/2, obj.cy);
        CANVASCONTEXT.lineTo(obj.cx+obj.cLe/2, obj.cy+obj.cWi);
        CANVASCONTEXT.stroke(); 
        CANVASCONTEXT.beginPath();
        CANVASCONTEXT.moveTo(obj.cx, obj.cy+obj.cWi/2);
        CANVASCONTEXT.lineTo(obj.cx+obj.cLe, obj.cy+obj.cWi/2);
        CANVASCONTEXT.stroke(); 
    }
    //object text
    CANVASCONTEXT.globalAlpha=1.0;
    CANVASCONTEXT.font = "10px Arial";
    CANVASCONTEXT.fillText(obj.name+""+obj.id, obj.cx,obj.cy);
}

this.contains=function(obj,mx,my){
    if(mx>obj.cx && mx<obj.cx+obj.cLe && my>obj.cy && my<obj.cy+obj.cWi){
        return true;
    }
    return false;
}

var dis2=function(x,y,a,b){
    return Math.sqrt( (x-a)*(x-a) + (y-b)*(y-b) );
}

var Di=function(a,b){
    return Math.sqrt(Math.pow((a.x-b.x),2)+ Math.pow((a.y-b.y),2)+Math.pow((a.z-b.z),2));
}