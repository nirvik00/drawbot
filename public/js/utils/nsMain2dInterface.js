window.onload=function(){
    //all elements in memory= SceneElementsArr
    //refer to other global variables
    CANVAS=document.getElementById("canvas-viewer");
    CANVASCONTEXT=CANVAS.getContext('2d');
    CANVASCONTEXT.fillStyle="rgb(255,255,255)";
    CANVASCONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);

    CANVAS.addEventListener('mousedown', mouseDownListener);
    CANVAS.addEventListener('mouseup', mouseUpListener);
    CANVAS.addEventListener('mousemove', mouseMoveListener);

}

function mouseDownListener(e){
    var mousePos=getMousePosition(e);
    var mx=mousePos.x;
    var my=mousePos.y;
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        var t=contains(obj,mx,my);
        if(t){ // if mouse in obj in canvas
            obj.selected=true;
            constructProperty(obj   );//generate prop table
            break;
        }
        
    }

    CONNECTINGLINE=[];
    
    if(DRAGGING===true){
        CONNECTING=false;
        CONNECTINGLINE=[];
    }
    if(CONNECTING===true){
        DRAGGING=false;
        for(var i=0; i<SceneElementsArr.length; i++){
            if(obj.selected===true){
                CONNECTINGLINE.push(obj);
                alert(obj.name+","+obj.id);
                break;                                                                                                                                  
            }
        }
    }
    redrawCanvas();
}

function mouseUpListener(e){
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.selected===true){
            if(DRAGGING===true){
                obj.cx=getMousePosition(e).x;
                obj.cy=getMousePosition(e).y;
                obj.selected=false;
            }else if(CONNECTING===true){
                CONNECTINGLINE.push(obj);
            }
        } 
    }
    for(var i=0; i<SceneElementsArr.length; i++){
        SceneElementsArr[i].selected=false;
    }
    redrawCanvas();
}

function mouseMoveListener(e){
    var mousePos=getMousePosition(e);
    var mx=mousePos.x;
    var my=mousePos.y;
    if(DRAGGING===true){//if mouse down && event.button=0
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj=SceneElementsArr[i];
            if(obj.selected===true && DRAGGING===true){
                obj.cx=getMousePosition(e).x;                                                                       ``
                obj.cy=getMousePosition(e).y;
            }
        }
    }
    //if mouse on object reveal properties
    for(var i=0; i<SceneElementsArr.length;i++){
        var obj=SceneElementsArr[i];
        var t=contains(obj,mx,my);
        if(t){
            constructProperty(obj);//generate prop table
        }
    }
    try{
        if(CONNECTINGLINE.length>0){
            var obj=CONNECTINGLINE[0];
            var rx=obj.cx+obj.cLe/2;
            var ry=obj.cy+obj.cWi/2;
            console.log(rx,ry);
            var sx=getMousePosition(e).x;
            var sy=getMousePosition(e).y;
            CANVASCONTEXT.globalAlpha=1.0;
            CANVASCONTEXT.fillStyle="rgb(0,0,0)";
            CANVASCONTEXT.beginPath();
            CANVASCONTEXT.moveTo(rx,ry);
            CANVASCONTEXT.lineTo(sx,sy);
            CANVASCONTEXT.stroke();
        }
    }catch(err){
        //do nothing
    }
 
    redrawCanvas();
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
    CANVASCONTEXT.fillStyle="rgb(255,255,255)";
    CANVASCONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        drawNodeGeom(obj);    
    }
    CANVASCONTEXT.strokeRect(getMousePosition.x, getMousePosition.y, 10, 10);
    canvasUpdateMsg();
}

var constructProperty= function(obj){   
    if(obj.name==="POINT"){
        setPoint(obj);
    }else if(obj.name==="LINE"){
        setLine(obj);
    }
} 

var canvasUpdateMsg=function(){
    CANVASCONTEXT.globalAlpha=1.0;
    CANVASCONTEXT.fillStyle="rgb(0,0,0)";
    CANVASCONTEXT.font = "10px Arial";
    CANVASCONTEXT.fillText(CANVASMSG, 10,10);
}