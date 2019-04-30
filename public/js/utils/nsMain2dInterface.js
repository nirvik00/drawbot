window.onload=function(){
    //all elements in memory= SceneElementsArr
    //refer to other global variables
    CANVAS=document.getElementById("canvas-viewer");
    CANVASCONTEXT=CANVAS.getContext('2d');
    CANVASCONTEXT.fillStyle="rgb(255,255,255)";
    CANVASCONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);

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
    CANVASCONTEXT.fillStyle="rgb(255,255,255)";
    CANVASCONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);
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

