window.onload=function(){
    //all elements in memory= SceneElementsArr
    //refer to other global variables
    CANVAS=document.getElementById("canvas-viewer");
    CANVASCONTEXT=CANVAS.getContext('2d');
    property(CANVASCONTEXT);

    CANVAS.addEventListener('mousedown', mouseDownListener);
    CANVAS.addEventListener('mouseup', mouseUpListener);
    CANVAS.addEventListener('mousemove', mouseMoveListener)
}

function mouseDownListener(e){
    dragging=true;
}

function mouseUpListener(e){
    dragging=false;
    //
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.selected===true){
            console.log("released: "+obj.name);
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
            var t=obj.contains(mx,my);
            if(t){
                obj.selected=true;
                console.log("selected: "+obj.name);
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
        obj.generateNodeGeom();    
    }
    CANVASCONTEXT.strokeRect(getMousePosition.x, getMousePosition.y, 10, 10);
}

var property= function(ctx){}