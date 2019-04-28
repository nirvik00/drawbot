var CANVAS;//=document.getElementById("sceneGraphCanvas");
var CTX;//=canvas.getContext("2d");

var geo2dMenu, algMenu, aiMenu; // main menu

window.onload=function(){
    CANVAS=document.getElementById("sceneGraphCanvas");
    CTX=CANVAS.getContext("2d");
    geo2dMenu=new genGeo2dMainMenu(CTX);
    algMenu=new genAlgMainMenu(CTX);
    aiMenu=new aiMenu(CTX);
    draw();
}

function draw(){
    CTX.clearRect(0,0,CANVAS.width, CANVAS.height);
    algMenu.display();
    geo2dMenu.display();
    aiMenu.display();
    CANVAS.addEventListener("mousedown", doMouseDown, false);
    CANVAS.addEventListener("mousemove", doMouseMove, false);
    window.requestAnimationFrame(draw); 
}

function doMouseDown(e){
    var x=e.pageX;
    var y=e.pageY;    
    var t=algMenu.selected(x,y);
    if(t===true){
        geo2dMenu.mousedown=false;
        aiMenu.mousedown=false;
    }
    var g=geo2dMenu.selected(x,y);
    if(g===true){
        algMenu.mousedown=false;
        aiMenu.mousedown=false;
    }
    var h=aiMenu.selected(x,y);
    if(g===true){
        algMenu.mousedown=false;
        geo2dMenu.mousedown=false;
    }
}

function doMouseMove(e){
    var x=e.pageX;
    var y=e.pageY;    
    algMenu.hover(x,y);
    geo2dMenu.hover(x,y);
    aiMenu.hover(x,y);
}
