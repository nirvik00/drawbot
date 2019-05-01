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

    this.interPpts=[];
    this.interpMesh=[];

    this.updatePts=function(p,q){
        this.p=p;
        this.q=q;
    }

    this.updateEdge=function(e){
        this.Edge=e;
    }

    this.generateGeometry3d=function(){
        try{
            for(var i=0; i<this.interPpts.length; i++){
                this.interPpts[i].mesh.geometry.dispose();
                this.interPpts[i].mesh.material.dispose();
                scene.remove(this.interPpts[i].mesh);
            }
            console.log("meshed.deleted");
        }catch(e){
            console.log("gen point");
        }
        this.interPpts=[];

        if(this.interpMesh===undefined && this.interpMesh.length==0){
            for(var i=0; i<this.interpMesh.length; i++){
                this.interpMesh[i].mesh.geometry.dispose();
                this.interpMesh[i].mesh.material.dispose();
                scene.remove(this.interpMesh[i].mesh);
            }
            console.log("meshed.deleted");
        }

        this.interpMesh=[];


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
            this.interPpts.push(p);
        }
    }
}