
//from html to generate geometry menu and event listeners
//create html, event listeners for the main menu

//elements div is the floating div to which various elements are added

var createGeomMenu=function(){
    ELEMENTS=document.getElementById("elements");
    var FloatingDiv;
    FloatingDiv=document.createElement('div');
    FloatingDiv.id='floating-geom';
    document.body.appendChild(FloatingDiv);
    
    var Point=document.createElement("BUTTON");
    Point.innerHTML="POINT";
    Point.className="button";
    FloatingDiv.appendChild(Point);
    Point.addEventListener('click', function(){
        var p=new nsPt(0,0,0); // file : nsGeomLib.js
        p.id=ElementCounter; // file: nsGlobalVariable.js
        p.generateGeometry3d(); // file : nsGeomLib.js = 3DVIEWER
        initNodeGeom(p); // file : nsGeomLib.js = CANVAS
        SceneElementsArr.push(p); // file: nsGlobalVariable.js
        ElementCounter++; // file: nsGlobalVariable.js
    });

    var Line=document.createElement("BUTTON");
    Line.innerHTML="LINE";
    Line.className="button";
    FloatingDiv.appendChild(Line);
    Line.addEventListener('click', function(){
        var p=new nsPt(0,0,0); p.id=-1; // file : nsGeomLib.js
        var q=new nsPt(0,0,0); q.id=-1; // file : nsGeomLib.js
        var l=new nsLine(p,q); // file : nsGeomLib.js
        l.generateGeometry3d(); // file : nsGeomLib.js = 3DVIEWER
        l.id=ElementCounter; // file: nsGlobalVariable.js
        initNodeGeom(l); // file : nsGeomLib.js = CANVAS
        SceneElementsArr.push(l); // file: nsGlobalVariable.js
        ElementCounter++; // file: nsGlobalVariable.js
    });


    var Polygon=document.createElement("BUTTON");
    Polygon.innerHTML="POLYGON";
    Polygon.className="button";
    FloatingDiv.appendChild(Polygon);
    Polygon.addEventListener('click', function(){

    });

    var endButton=document.createElement("BUTTON");
    endButton.className="button";
    endButton.innerHTML="CLOSE";
    FloatingDiv.appendChild(endButton);

    document.getElementById("geom-menu").addEventListener('click', function(){
        document.getElementById("floating-alg").style.display='none';
        FloatingDiv.style.display='block';
    }); 
    document.getElementById("hide-menu").addEventListener('click', function(){
        FloatingDiv.style.display='none';
    }); 
    endButton.addEventListener('click', function(){
        FloatingDiv.style.display='none';
        canvasUpdateConnections(); //file : nsConnectElements.js
        redrawCanvas(); // file: nsMain2dInterface.js
    });
    document.getElementById("connect-mode").addEventListener('click', function(){
        CONNECTING=true;
        DRAGGING=false;
        CANVASMSG="connecting-mode";
        canvasUpdateMsg();
        redrawCanvas();
    });
    document.getElementById("drag-mode").addEventListener('click', function(){
        DRAGGING=true;
        CONNECTING=false;
        CANVASMSG="dragging-mode";
        canvasUpdateMsg();
        redrawCanvas();
    });

}
// algorithm menu from event listener added to html 
var createAlgMenu=function(){
    ELEMENTS=document.getElementById("elements");
    var FloatingDiv;
    FloatingDiv=document.createElement('div');
    FloatingDiv.id='floating-alg';
    document.body.appendChild(FloatingDiv);
    
    var EdgeGrid=document.createElement("BUTTON");
    EdgeGrid.innerHTML="EDGE-GRID";    
    EdgeGrid.className="button";
    FloatingDiv.appendChild(EdgeGrid);
    EdgeGrid.addEventListener('click', function(){
        var p=new nsPt(0,0,0); p.id=-1; // file : nsGeomLib.js
        var q=new nsPt(0,0,0); q.id=-1; // file : nsGeomLib.js
        var l=new nsLine(p,q); l.id=-1; // file : nsGeomLib.js
        var a=new nsEdgeGridAlg("EdgeGrid", p, q, l); // file : nsAlgLib.js
        a.id=ElementCounter; // file: nsGlobalVariable.js
        initNodeGeom(a); // file : nsGeomLib.js = CANVAS
        SceneElementsArr.push(a); // file: nsGlobalVariable.js
        ElementCounter++; // file: nsGlobalVariable.js
    });


    var endButton=document.createElement("BUTTON");
    endButton.className="button";
    endButton.innerHTML="CLOSE";
    FloatingDiv.appendChild(endButton);

    document.getElementById("alg-menu").addEventListener('click', function(){
        document.getElementById("floating-geom").style.display='none';
        FloatingDiv.style.display='block';
    }); 

    endButton.addEventListener('click', function(){
        FloatingDiv.style.display='none';
        canvasUpdateConnections(); //file : nsConnectElements.js
        redrawCanvas(); // file: nsMain2dInterface.js
    });
}

