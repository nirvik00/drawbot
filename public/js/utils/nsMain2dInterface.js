window.onload=function(){
    //all elements in memory= SceneElementsArr
    //refer to other global variables
    CANVAS=document.getElementById("canvas-viewer");
    CANVASCONTEXT=CANVAS.getContext('2d');

    CANVAS.addEventListener('mousedown', mouseDownListener);
    CANVAS.addEventListener('mouseup', mouseUpListener);
    CANVAS.addEventListener('mousemove', mouseMoveListener)
}

function mouseDownListener(e){
    dragging=true;
}

function mouseUpListener(e){
    dragging=false;
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.selected===true){
            obj.cx=getMousePosition(e).x;
            obj.cy=getMousePosition(e).y;
            obj.selected=false;
            redrawCanvas();
            break;
        }
    }
}

function mouseMoveListener(e){
    var mousePos=getMousePosition(e);
    var mx=mousePos.x;
    var my=mousePos.y;
    if(dragging){
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj=SceneElementsArr[i];
            var t=contains(obj,mx,my);
            if(t){
                obj.selected=true;
                constructProperty(obj);
                break;
            }
        }
    }
}

function getMousePosition(e){
    var rect=CANVAS.getBoundingClientRect();
    return {
        x:e.clientX - rect.left,
        y:e.clientY - rect.top
    };
}

function redrawCanvas(){
    CANVASCONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        drawNodeGeom(obj);    
    }
    CANVASCONTEXT.strokeRect(getMousePosition.x, getMousePosition.y, 10, 10);
}

var constructProperty= function(obj){   
    if(obj.name==="POINT"){
        setPoint(obj);
    }else if(obj.name==="LINE"){
        setLine(obj);
    }
} 

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
    tbl.appendChild(trP);
    trP.appendChild(P0);
    trP.appendChild(P);
    
    var trQ=document.createElement('tr');
    var Q0=document.createElement('td');
    Q0.innerHTML="end Point (name) : ";
    var Q=document.createElement("input");
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
            if(P.value===t){
                obj.p=obj2;
            }else if(Q.value===t){
                obj.q=obj2;
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