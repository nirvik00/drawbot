
function updateRelations(parent, child){
    ELEMENTRELATIONS.push([parent, child]);
    redrawCanvas();
}


function canvasUpdateConnections(){
    for(var i=0; i<ELEMENTRELATIONS.length; i++){
        var parent=ELEMENTRELATIONS[i][0];
        var child=ELEMENTRELATIONS[i][1];
        var x0=parent.cx + parent.cLe/2;
        var y0=parent.cy + parent.cWi/2;
        var x1=child.cx + child.cLe/2;
        var y1=child.cy + child.cWi/2;
        CANVASCONTEXT.beginPath();
        CANVASCONTEXT.moveTo(x0,y0);
        CANVASCONTEXT.lineTo(x1,y1);
        CANVASCONTEXT.stroke();
    }
}
