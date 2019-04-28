
function genGeoMainMenu(ctx){
    ctx.font="20px Arial";
    if(geomMenuSel===true && geomMenuDis===false){
        ctx.fillStyle="rgb(155,50,0)";
    }
    else if(geomMenuSel===true && geomMenuDis===true){
        ctx.fillStyle="rgb(255,0,0)";
    }else{
        ctx.fillStyle="rgb(0,0,0)";
    }
    ctx.fillRect(0,0,120,50);
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillText("Geometry", 10, 30);
    return a=[0,0,120,50];
}



function genAlgMainMenu(ctx){
    ctx.font="20px Arial";
    if(geomMenuSel===true && geomMenuDis===false){
        ctx.fillStyle="rgb(155,50,0)";
    }
    else if(geomMenuSel===true && geomMenuDis===true){
        ctx.fillStyle="rgb(255,0,0)";
    }else{
        ctx.fillStyle="rgb(0,0,0)";
    }
    ctx.fillRect(0,0,120,50);
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillText("Geometry", 10, 30);
    return a=[0,0,120,50];
}
