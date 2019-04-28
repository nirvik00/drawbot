var CANVAS;//=document.getElementById("sceneGraphCanvas");
var CTX;//=canvas.getContext("2d");

var geoMenu, algMenu; // main menu

window.onload=function(){
    CANVAS=document.getElementById("sceneGraphCanvas");
    CTX=CANVAS.getContext("2d");
    geoMenu=new genGeoMainMenu(CTX);
    algMenu=new genAlgMainMenu(CTX);
    draw();
}

function draw(){
    CTX.clearRect(0,0,CANVAS.width, CANVAS.height);
    algMenu.display();
    geoMenu.display();

    CANVAS.addEventListener("mousedown", doMouseDown, false);
    CANVAS.addEventListener("mousemove", doMouseMove, false);

    window.requestAnimationFrame(draw); 
}

function doMouseDown(e){
    var x=e.pageX;
    var y=e.pageY;    
    
    var t=algMenu.selected(x,y);
    if(t===true){
        geoMenu.mousedown=false;
    }
    var g=geoMenu.selected(x,y);
    if(g===true){
        algMenu.mousedown=false;
    }
}

function doMouseMove(e){
    var x=e.pageX;
    var y=e.pageY;    

    algMenu.hover(x,y);
    geoMenu.hover(x,y);

}
