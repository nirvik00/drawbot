//handles main events on the canvas
// redraw function 

//sends to update property file

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
            constructProperty(obj); //file : this; generate prop table
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
            var obj=SceneElementsArr[i];
            if(obj.selected===true){
                CONNECTINGLINE[0]=obj;
                //console.log("ini: "+obj.cx+","+obj.cy)
                break;                                                                                                                                  
            }
        }
    }
    //redrawCanvas();
}

function mouseUpListener(e){
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.selected===true){
            if(DRAGGING===true){
                obj.cx=getMousePosition(e).x;
                obj.cy=getMousePosition(e).y;
                obj.selected=false;
            }
        } 
    }
    if(CONNECTING===true && CONNECTINGLINE.length>0){
        var cx=CONNECTINGLINE[0].cx;
        var cy=CONNECTINGLINE[0].cy;
        var cR=CONNECTINGLINE[0].cR;
        var a=getMousePosition(e).x;
        var b=getMousePosition(e).y;
        if(dis2(cx,cy,a,b)<cR){
            console.log("inside same obj");
        }else{
            console.log("trying to find 2");
            for(var i=0; i<SceneElementsArr.length; i++){
                var x=SceneElementsArr[i].cx;
                var y=SceneElementsArr[i].cy;
                var r=SceneElementsArr[i].cR;
                if(dis2(cx,cy,x,y)>cR && dis2(a,b,x,y)<r){
                    CONNECTINGLINE[1]=SceneElementsArr[i];
                    console.log("final: "+x+","+y)
                    break;
                }
            }
        }
    }
    //deselect all objects
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
            redrawCanvas();
            constructProperty(obj);// file: same file = generate prop table
        }
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
        drawNodeGeom(obj); // file : nsGeomLib.js
    }
    CANVASCONTEXT.strokeRect(getMousePosition.x, getMousePosition.y, 10, 10);
    
    try{
        var cx=CONNECTINGLINE[0].cx;
        var cy=CONNECTINGLINE[0].cy;
        var ca=CONNECTINGLINE[1].cx;
        var cb=CONNECTINGLINE[1].cy; 
        CANVASCONTEXT.globalAlpha=1.0;
        CANVASCONTEXT.fillStyle="rgb(0,0,0)";
        CANVASCONTEXT.beginPath();
        CANVASCONTEXT.moveTo(cx,cy);
        CANVASCONTEXT.lineTo(ca,cb);
        CANVASCONTEXT.stroke();
    }catch(err){

    }
    canvasUpdateConnections();// in file nsConnectElements
    canvasUpdateMsg(); // this file
}

var constructProperty= function(obj){   
    if(obj.name==="POINT"){
        genHTMLPropsForSetPoint(obj); // file : nsUpdateProp.js
    }else if(obj.name==="LINE"){
        genHTMLPropsForSetLine(obj); // file : nsUpdateProp.js
    }else if(obj.name==='EDGEGRID'){
        genHTMLPropsForEdgeGrid(obj); // file : nsUpdateProp.js
    }
} 

var canvasUpdateMsg=function(){
    CANVASCONTEXT.globalAlpha=1.0;
    CANVASCONTEXT.fillStyle="rgb(0,0,0)";
    CANVASCONTEXT.font = "10px Arial";
    CANVASCONTEXT.fillText(CANVASMSG, 10,10);
}