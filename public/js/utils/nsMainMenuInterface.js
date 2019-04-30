var createMenu=function(){
    ELEMENTS=document.getElementById("elements");
    var FloatingDiv;
    FloatingDiv=document.createElement('div');
    FloatingDiv.id='floating';
    document.body.appendChild(FloatingDiv);
    
    var Point=document.createElement("BUTTON");
    Point.innerHTML="POINT";
    Point.className="button";
    FloatingDiv.appendChild(Point);
    Point.addEventListener('click', function(){
        var p=new nsPt(0,0,0);
        p.id=ElementCounter;
        p.generateGeometry3d();
        initNodeGeom(p);
        SceneElementsArr.push(p);
        displaySceneElements();
        ElementCounter++;
    });

    var Line=document.createElement("BUTTON");
    Line.innerHTML="LINE";
    Line.className="button";
    FloatingDiv.appendChild(Line);
    Line.addEventListener('click', function(){
        var p=new nsPt(0,0,0); p.id=-1;
        var q=new nsPt(0,0,0); q.id=-1;
        var l=new nsLine(p,q);
        l.generateGeometry3d();
        l.id=ElementCounter;
        initNodeGeom(l);
        SceneElementsArr.push(l);
        displaySceneElements();
        ElementCounter++;
    });
    
    var endButton=document.createElement("BUTTON");
    endButton.className="button";
    endButton.innerHTML="CLOSE";
    FloatingDiv.appendChild(endButton);

    document.getElementById("geom-menu").addEventListener('click', function(){
        FloatingDiv.style.display='block';
    }); 
    document.getElementById("hide-menu").addEventListener('click', function(){
        FloatingDiv.style.display='none';
    }); 
    endButton.addEventListener('click', function(){
        FloatingDiv.style.display='none';
    });
}

var displaySceneElements=function(){
    //console.log(SceneElementsArr);
}
