
var nsPt=function(x,y,z){
    this.name="POINT";
    this.x=x;
    this.y=y;
    this.z=z;
    this.p=new THREE.Vector3(this.x,this.y,this.z);
    this.r=1.0;
    this.mesh;
    this.geo;
    this.mat;
    this.generateGeometry3d=function(){        
        this.geo=new THREE.SphereBufferGeometry(this.r,10,10);
        this.mat=new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        this.mesh=new THREE.Mesh(this.geo,this.mat);
        this.mesh.position.x=this.x;
        this.mesh.position.y=this.y;
        this.mesh.position.z=this.z;
        //scene.add(this.mesh);
    }
    this.genSelectedGeometry3d=function(){     
        this.geo=new THREE.SphereBufferGeometry(this.r*0.95,10,10);
        this.mat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.mesh=new THREE.Mesh(this.geo,this.mat);
        this.mesh.position.x=this.x;
        this.mesh.position.y=this.y;
        this.mesh.position.z=this.z;
        //scene.add(this.mesh);
        console.log("generate selected mesh");
    }
}

var nsLine=function(p,q){
    this.name="LINE";
    this.P=p;
    this.Q=q;
    this.mesh;
    this.generateGeometry=function(){
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(p.x,p.y,p.z));
        geo.vertices.push(new THREE.Vector3(q.x,q.y,q.z));
        var mat=new THREE.LineBasicMaterial({ 
               color: new THREE.Color("rgb(0,0,255)") 
        });
        this.mesh= new THREE.Line( geo, mat);
        scene.add(this.mesh);
    }
}

var Di=function(a,b){
    return Math.sqrt(Math.pow((a.x-b.x),2)+ Math.pow((a.y-b.y),2)+Math.pow((a.z-b.z),2));
}