var setLine=function(obj){
    var tbl=document.getElementById("property-table");
    while (tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }        
    var tr1=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    td1.innerHTML=obj.name+""+obj.id;
    td2.innerHTML="Enter Values";
    tbl.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);

    var trP=document.createElement('tr');
    var P0=document.createElement('td');
    P0.innerHTML="start Point (name) : ";
    var P=document.createElement("input");
    if(obj.p.id===-1){ 
        P.value="not initialized";
    }else{
        P.value=obj.p.name.toUpperCase()+""+obj.p.id;
    }
    tbl.appendChild(trP);
    trP.appendChild(P0);
    trP.appendChild(P);
    
    var trQ=document.createElement('tr');
    var Q0=document.createElement('td');
    Q0.innerHTML="end Point (name) : ";
    var Q=document.createElement("input");
    if(obj.q.id===-1){ 
        Q.value="not initialized";
    }else{
        Q.value=obj.q.name.toUpperCase()+""+obj.q.id;
    }
    tbl.appendChild(trQ);
    trQ.appendChild(Q0);
    trQ.appendChild(Q);

    var trEnd=document.createElement("tr");
    var submit=document.createElement("button");
    submit.innerHTML="SUBMIT";
    tbl.appendChild(trEnd);
    trEnd.appendChild(submit);

    submit.addEventListener('click', function(e){
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj2=SceneElementsArr[i];
            var t=obj2.name+""+obj2.id;
            if(P.value.toUpperCase()===t){
                obj.p=obj2;
                P.value=obj2.name+""+obj2.id;
            }else if(Q.value.toUpperCase()===t){
                obj.q=obj2;
                Q.value=obj2.name+""+obj2.id;
            }
        }
        obj.generateGeometry3d();
        updateElementChanges();
    });

}

var setPoint=function(obj){
    var tbl=document.getElementById("property-table");
    while (tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }        
    var tr1=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    td1.innerHTML=obj.name+""+obj.id;
    td2.innerHTML="Enter Values";
    tbl.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);

    var trx=document.createElement("tr");
    var x0=document.createElement("td");
    var X=document.createElement("input");
    x0.innerHTML="X-coordinate";
    X.value=obj.x;
    tbl.appendChild(trx);
    trx.appendChild(x0);
    trx.appendChild(X);

    var trY=document.createElement("tr");
    var y0=document.createElement("td");
    var Y=document.createElement("input");
    y0.innerHTML="Y-coordinate";
    Y.value=obj.y;
    tbl.appendChild(trY);
    trY.appendChild(y0);
    trY.appendChild(Y);

    var trZ=document.createElement("tr");
    var z0=document.createElement("td");
    var Z=document.createElement("input");
    z0.innerHTML="Z-coordinate";
    Z.value=obj.z;
    tbl.appendChild(trZ);
    trZ.appendChild(z0);
    trZ.appendChild(Z);

    var trEnd=document.createElement("tr");
    var submit=document.createElement("button");
    submit.innerHTML="SUBMIT";
    tbl.appendChild(trEnd);
    trEnd.appendChild(submit);

    var rx=obj.x; 
    var ry=obj.y;
    var rz=obj.z;

    submit.addEventListener('click', function(e){
        xval=parseFloat(X.value);
        yval=parseFloat(Y.value);
        zval=parseFloat(Z.value);
        if(!Number.isNaN(xval)){
            rx=xval;
        }
        if(!Number.isNaN(yval)){
            ry=yval;
        }
        if(!Number.isNaN(zval)){
            rz=zval;
        }
        obj.x=rx;
        obj.y=ry;
        obj.z=rz;
        obj.generateGeometry3d();   
        updateElementChanges();
    });          
}

function updateElementChanges(){
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        obj.generateGeometry3d();
    }   
}