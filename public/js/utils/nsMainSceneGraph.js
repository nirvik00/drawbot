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
    
    algMenu.selected(x,y);
    geoMenu.selected(x,y);

}

function doMouseMove(e){
    var x=e.pageX;
    var y=e.pageY;    

    algMenu.hover(x,y);
    geoMenu.hover(x,y);

}
