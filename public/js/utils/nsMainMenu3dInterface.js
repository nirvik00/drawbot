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
        var x=Math.random()*10;
        var y=Math.random()*10;
        var z=0.0;
        var p=new nsPt(x,y,z);
        p.generateGeometry();
        console.log(p);
        SceneElementsArr.push(p);
        displaySceneElements();
    });

    var Line=document.createElement("BUTTON");
    Line.innerHTML="LINE";
    Line.className="button";
    FloatingDiv.appendChild(Line);
    Line.addEventListener('click', function(){
        var p=new nsPt(0,0,0);
        var q=new nsPt(10,2,5);
        var l=new nsLine(p,q);
        l.generateGeometry();
        SceneElementsArr.push(l);
        console.log(l);
        displaySceneElements();
    });
    
    var endButton=document.createElement("BUTTON");
    endButton.innerHTML="END";
    FloatingDiv.appendChild(endButton);

    document.getElementById("show-menu").addEventListener('click', function(){
        FloatingDiv.style.display='block';
    }); 
    document.getElementById("hide-menu").addEventListener('click', function(){
        FloatingDiv.style.display='none';
    }); 
}

var displaySceneElements=function(){
    console.log(SceneElementsArr);
}
