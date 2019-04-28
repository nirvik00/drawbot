var mainMenuRects=[];
var geomMenuSel=false;
var geomMenuDis=false;


window.onload=function(){
    draw();
}

function draw(){
    var canvas=document.getElementById("sceneGraphCanvas");
    var ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //array of main menu rects
    mainMenuRects[0]=genGeoMainMenu(ctx);

    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("mousemove", doMouseMove, false);

    window.requestAnimationFrame(draw); 
}



function doMouseDown(e){
    var x=e.pageX;
    var y=e.pageY;    
    for(var i=0; i< mainMenuRects.length; i++){
        var a=mainMenuRects[i][0]+25;
        var b=mainMenuRects[i][1]+25;
        var c=mainMenuRects[i][2]+25;
        var d=mainMenuRects[i][3]+25;
        if((x>a && x<a+c && y>b && y<b+d)){
            geomMenuDis=true;         
        }else{
            geomMenuDis=false;
        }
    }
}

function doMouseMove(e){
    var x=e.pageX;
    var y=e.pageY;    
    for(var i=0; i< mainMenuRects.length; i++){
        var a=mainMenuRects[i][0]+25;
        var b=mainMenuRects[i][1]+25;
        var c=mainMenuRects[i][2]+25;
        var d=mainMenuRects[i][3]+25;
        if((x>a && x<a+c && y>b && y<b+d)){
            geomMenuSel=true;            
        }else{
            geomMenuSel=false;
            geomMenuDis=false;
        }
    }
}