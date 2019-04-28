
var nsPt=function(x,y,z){
    this.name="POINT";
    this.x=x;
    this.y=y;
    this.z=z;
    this.r=30.0;
    this.generateGeometry=function(){        
        var geo=new THREE.SphereBufferGeometry(this.r,10,10);
        var mat=new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        var mesh=new THREE.Mesh(geo,mat);
        scene.add(mesh);
    }
}

var nsLine=function(p,q){
    this.name="LINE";
    this.P=p;
    this.Q=q;
    this.generateGeometry=function(){
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(p.x,p.y,p.z));
        geo.vertices.push(new THREE.Vector3(q.x,q.y,q.z));
        var mat=new THREE.LineBasicMaterial({ 
               color: new THREE.Color("rgb(0,0,255)") 
        });
        var line = new THREE.Line( geo, mat);
        scene.add(line);
    }
}
