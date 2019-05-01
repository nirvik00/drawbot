function nsEdgeGridAlg(name, p, q, l){
    this.id=-1;
    this.name=name.trim().toUpperCase();
    this.cx=0; //for canvas
    this.cy=0; //for canvas
    this.cLe=30; //for canvas
    this.cWi=50; //for canvas
    this.cr=10;//inner radius
    this.cR=30;//outer radius
    this.colr="rgb(100,100,100)";
    
    this.p=p;//start-point
    this.q=q;//end-point
    this.Edge=l;//edge

    this.colr3d="rgb(0,0,0)"; //for scene 3d
    this.rad3d=0.1; //for scene 3d
    this.num=5; //number of interp points
    this.depth=3; //depth of interp grid
    this.dir=1; //direction of normal

    this.interpts=[];
    this.interptsNormal=[];
    this.interpMesh=[];
    this.interpedges=[];

    this.updatePts=function(p,q){
        this.p=p;
        this.q=q;
    }

    this.updateEdge=function(e){
        this.Edge=e;
    }

    this.generateinterpts=function(){
        var ux=parseFloat(this.q.x)- parseFloat(this.p.x);
        var uy=parseFloat(this.q.y)- parseFloat(this.p.y);
        var uz=parseFloat(this.q.z)- parseFloat(this.p.z);
        var d=parseFloat(1.0/this.num);
        var k=0;
        for(var i=0.00;i<=1.00;i+=d){
            var x=parseFloat(this.p.x)+(ux*d*k);
            var y=parseFloat(this.p.y)+(uy*d*k);
            var z=parseFloat(this.p.z)+(uz*d*k);
            k++;
            var p=new nsPt(x,y,z);
            p.r=this.rad3d;
            p.colr=this.colr3d;
            mesh=p.generateGeometry3d();
            this.interpMesh.push(mesh);
            this.interpts.push(p);
        }
    }

    this.generateNormalSeg=function(){
        var px=parseFloat(this.p.x);
        var py=parseFloat(this.p.y);
        var pz=parseFloat(this.p.z);

        var qx=parseFloat(this.q.x);
        var qy=parseFloat(this.q.y);
        var qz=parseFloat(this.q.z);

        var ux=qx-px;
        var uy=qy-py;
        var uz=qz-pz;

        var norm=Math.sqrt(ux*ux + uy*uy +uz*uz);

        var u=[ux/norm, uy/norm, uz/norm];
        var v=[u[1], -u[0], u[2]];
        if(this.dir===1){
            v=[-u[1], u[0], u[2]];
        }
        for(var i=0; i<this.interpts.length; i++){
            var p=this.interpts[i];
            var x=parseFloat(p.x);
            var y=parseFloat(p.y);
            var z=parseFloat(p.z);
            var qx=x+v[0]*this.depth;
            var qy=y+v[1]*this.depth;
            var qz=z+v[2]*this.depth;
            var pt=new nsPt(qx,qy,qz);
            pt.r=this.rad3d;
            pt.colr=this.colr3d;
            mesh=pt.generateGeometry3d();
            this.interpMesh.push(mesh);
            this.interptsNormal.push(pt);
        }

        for(var i=0; i<this.interpts.length; i++){
            var p=this.interpts[i];
            var q=this.interptsNormal[i];
            var u=new nsLine(p,q);
            u.colr="rgb(250,150,0)";
            var mesh0=u.generateGeometry3d(); // file : nsGeomLib.js = 3DVIEWER
            this.interpMesh.push(mesh0);
            if(i<this.interpts.length-1){
                var a=this.interpts[i];
                var b=this.interpts[i+1];
                var c=this.interptsNormal[i];
                var d=this.interptsNormal[i+1];
                var v=new nsLine(a,b);
                v.colr="rgb(250,150,0)";
                var w=new nsLine(c,d);
                w.colr="rgb(250,150,0)";
                this.interpedges.push(u);
                this.interpedges.push(v);
                var mesh1=v.generateGeometry3d(); // file : nsGeomLib.js = 3DVIEWER
                var mesh2=w.generateGeometry3d(); // file : nsGeomLib.js = 3DVIEWER
                this.interpMesh.push(mesh1);
                this.interpMesh.push(mesh2);
            }
        }
    }

    this.inputError=function(){
        var px=parseFloat(this.p.x);
        var py=parseFloat(this.p.y);
        var pz=parseFloat(this.p.z);

        var qx=parseFloat(this.q.x);
        var qy=parseFloat(this.q.y);
        var qz=parseFloat(this.q.z);
        if(px===qx && py===qy && pz===qz){
            return true; // threre is error
        }else{
            return false; //no error
        }
    }

    this.generateGeometry3d=function(){
        if(this.interpMesh===undefined && this.interpMesh.length==0){
        }else{
            for(var i=0; i<this.interpMesh.length; i++){
                this.interpMesh[i].geometry.dispose();
                this.interpMesh[i].material.dispose();
                scene.remove(this.interpMesh[i]);
            }
            console.log("meshed.deleted");
        }

        if(this.interpts===undefined && this.interpts.length==0){
        }else{
            for(var i=0; i<this.interpts.length; i++){
                this.interpts[i].mesh.geometry.dispose();
                this.interpts[i].mesh.material.dispose();
                scene.remove(this.interpts[i].mesh);
            }
        }

        this.interpMesh=[]; //make sure to clear array after deleting the mesh
        this.interpts=[]; //clear array after deleting mesh
        this.interptsNormal=[];
        this.interpedges=[]; //clear the interpolated edges mesh

        var t=this.inputError();
        if(t===false){
            this.generateinterpts(); //generate the interpolated points
            this.generateNormalSeg(); //generate normal points
        }
    }
}
