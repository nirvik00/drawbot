
var createMenu=function(){
    ELEMENTS=document.getElementById("elements");
    var FloatingDiv;
    FloatingDiv=document.createElement('div');
    FloatingDiv.id='floating';
    document.body.appendChild(FloatingDiv);
    
    var Point=document.createElement("BUTTON");
    Point.innerHTML="POINT";
    FloatingDiv.appendChild(Point);
    Point.addEventListener('click', function(){
        var p=new nsPt(0,0,0);
        console.log(p);
        SceneElementsArr.push(p);
        displaySceneElements();
    });

    var Line=document.createElement("BUTTON");
    Line.innerHTML="LINE";
    FloatingDiv.appendChild(Line);
    Line.addEventListener('click', function(){
        var p=new nsPt(0,0,0);
        var q=new nsPt(50,50,50);
        var l=new nsLine(p,q);
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
