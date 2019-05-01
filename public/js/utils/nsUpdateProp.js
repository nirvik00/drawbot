

// user interaction to detect the connection between elements 
// dynamically generates html table with event listener

var genHTMLPropsForSetPoint=function(obj){
    var tbl=document.getElementById("property-table");
    while (tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }        
    var tr1=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    td1.innerHTML=obj.name+""+obj.id;
    td2.innerHTML="Enter Values";
    tbl.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);

    var trx=document.createElement("tr");
    var x0=document.createElement("td");
    var X=document.createElement("input");
    X.setAttribute("type", "number");
    x0.innerHTML="X-coordinate";
    X.value=obj.x;
    tbl.appendChild(trx);
    trx.appendChild(x0);
    trx.appendChild(X);

    var trY=document.createElement("tr");
    var y0=document.createElement("td");
    var Y=document.createElement("input");
    Y.setAttribute("type", "number");
    y0.innerHTML="Y-coordinate";
    Y.value=obj.y;
    tbl.appendChild(trY);
    trY.appendChild(y0);
    trY.appendChild(Y);

    var trZ=document.createElement("tr");
    var z0=document.createElement("td");
    var Z=document.createElement("input");
    Z.setAttribute("type", "number");
    z0.innerHTML="Z-coordinate";
    Z.value=obj.z;
    tbl.appendChild(trZ);
    trZ.appendChild(z0);
    trZ.appendChild(Z);

    var trEnd=document.createElement("tr");
    var submit=document.createElement("button");
    submit.innerHTML="SUBMIT";
    tbl.appendChild(trEnd);
    trEnd.appendChild(submit);

    var rx=obj.x; 
    var ry=obj.y;
    var rz=obj.z;

    submit.addEventListener('click', function(e){
        xval=parseFloat(X.value);
        yval=parseFloat(Y.value);
        zval=parseFloat(Z.value);
        if(!Number.isNaN(xval)){
            rx=xval;
        }
        if(!Number.isNaN(yval)){
            ry=yval;
        }

        if(!Number.isNaN(zval)){
            rz=zval;
        }
        obj.x=rx;
        obj.y=ry;
        obj.z=rz;
        obj.generateGeometry3d();   
        updateElementChanges();
    });          
}

var genHTMLPropsForSetLine=function(obj){
    var tbl=document.getElementById("property-table");
    while (tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }        
    var ptObjArr=getAllPoints(); //file: same

    var tr1=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    td1.innerHTML=obj.name+""+obj.id;
    td2.innerHTML="Enter Values";
    tbl.appendChild(tr1);
    tr1.appendChild(td1);
    tr1.appendChild(td2);

    //start-point: elect -options dynamically find all points and add drop-down menu
    var trP=document.createElement('tr');
    var P0=document.createElement('td');
    P0.innerHTML="start Point (name) : ";
    var P=document.createElement("input");
    if(obj.p.id===-1){ 
        P.value="not initialized";
    }else{
        P.value=obj.p.name.toUpperCase()+""+obj.p.id;
    }
    tbl.appendChild(trP);
    trP.appendChild(P0);
    trP.appendChild(P);
    // dynamically generate select-options of all points
    trP.appendChild(gethtmlSelectOptFromArrId(ptObjArr,"startPt"));

    //end-point: select -options dynamically find all points and add drop-down menu
    var trQ=document.createElement('tr');
    var Q0=document.createElement('td');
    Q0.innerHTML="end Point (name) : ";
    var Q=document.createElement("input");
    if(obj.q.id===-1){ 
        Q.value="not initialized";
    }else{
        Q.value=obj.q.name.toUpperCase()+""+obj.q.id;
    }
    tbl.appendChild(trQ);
    trQ.appendChild(Q0);
    trQ.appendChild(Q);
    // dynamically generate select-options of all points
    trQ.appendChild(gethtmlSelectOptFromArrId(ptObjArr,"endPt")); 

    var trEnd=document.createElement("tr");
    var submit=document.createElement("button");
    submit.innerHTML="SUBMIT";
    tbl.appendChild(trEnd);
    trEnd.appendChild(submit);

    submit.addEventListener('click', function(e){
        var g=document.getElementById("startPt");
        var startPt=g.options[g.selectedIndex].text;
        var e = document.getElementById("endPt");
        var endPt = e.options[e.selectedIndex].text;
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj2=SceneElementsArr[i];
            var t=obj2.name+""+obj2.id;
            if(P.value.toUpperCase()===t){
                obj.p=obj2;
                P.value=obj2.name+""+obj2.id;
                updateRelations(obj2,obj);//file: nsConnectElements.js
            }else if(startPt===t){
                obj.p=obj2;
                P.value=obj2.name+""+obj2.id;
                updateRelations(obj2,obj);//file: nsConnectElements.js
            }
            else if(Q.value.toUpperCase()===t){
                obj.q=obj2;
                Q.value=obj2.name+""+obj2.id;
                updateRelations(obj2,obj);//file: nsConnect Elements.js
            }else if(endPt===t){
                obj.q=obj2;
                Q.value=obj2.name+""+obj2.id;
                updateRelations(obj2,obj);// file: nsConnectElement.js
            }else{
                //do nothing because nothing happened!
            }
        }
        obj.generateGeometry3d(); // file : nsGeomLib.js
        updateElementChanges(); // obj file
    });

}


//algorithm
var genHTMLPropsForEdgeGrid=function(obj){
    var tbl=document.getElementById('property-table');
    while(tbl.hasChildNodes()){
        tbl.removeChild(tbl.firstChild);
    }
    var ptObjArr=getAllPoints();

    var tr1=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    td1.innerHTML=obj.name+""+obj.id;
    td2.innerHTML="ENTERVALUES";
    
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tbl.appendChild(tr1);

    var tr2=document.createElement("tr");
    var P0=document.createElement("td");
    var P=document.createElement("input");
    P0.innerHTML="enter start point";
    P.innerHTML="ENTERVALUES";
    
    tr2.appendChild(P0);
    tr2.appendChild(P);
    tbl.appendChild(tr1);

    //start-point: elect -options dynamically find all points and add drop-down menu
    var trP=document.createElement('tr');
    var P0=document.createElement('td');
    P0.innerHTML="start Point (name) : ";
    var P=document.createElement("input");
    if(obj.p.id===-1){ 
        P.value="not initialized";
    }else{
        P.value=obj.p.name.toUpperCase()+""+obj.p.id;
    }
    tbl.appendChild(trP);
    trP.appendChild(P0);
    trP.appendChild(P);
    // dynamically generate select-options of all points
    trP.appendChild(gethtmlSelectOptFromArrId(ptObjArr,"startPt"));

    //end-point: select -options dynamically find all points and add drop-down menu
    var trQ=document.createElement('tr');
    var Q0=document.createElement('td');
    Q0.innerHTML="end Point (name) : ";
    var Q=document.createElement("input");
    if(obj.q.id===-1){ 
        Q.value="not initialized";
    }else{
        Q.value=obj.q.name.toUpperCase()+""+obj.q.id;
    }
    tbl.appendChild(trQ);
    trQ.appendChild(Q0);
    trQ.appendChild(Q);
    // dynamically generate select-options of all points
    trQ.appendChild(gethtmlSelectOptFromArrId(ptObjArr,"endPt")); 

    var trEnd=document.createElement("tr");
    var submit=document.createElement("button");
    submit.innerHTML="SUBMIT";
    tbl.appendChild(trEnd);
    trEnd.appendChild(submit);

    submit.addEventListener('click', function(e){
        var g=document.getElementById("startPt");
        var startPt=g.options[g.selectedIndex].text;
        var e = document.getElementById("endPt");
        var endPt = e.options[e.selectedIndex].text;
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj2=SceneElementsArr[i];
            var t=obj2.name+""+obj2.id;
            if(P.value.toUpperCase()===t){
                obj.p=obj2;
                P.value=obj2.name+""+obj2.id;
                searchUpdateRelations(obj2,obj.cx, obj.cy);//file: nsConnectElements.js
            }else if(startPt===t){
                obj.p=obj2;
                P.value=obj2.name+""+obj2.id;
                searchUpdateRelations(obj2,obj.cx, obj.cy);//file: nsConnectElements.js
            }
            else if(Q.value.toUpperCase()===t){
                obj.q=obj2;
                Q.value=obj2.name+""+obj2.id;
                searchUpdateRelations(obj2,obj.cx, obj.cy);//file: nsConnect Elements.js
            }else if(endPt===t){
                obj.q=obj2;
                Q.value=obj2.name+""+obj2.id;
                searchUpdateRelations(obj2, obj.cx, obj.cy);// file: nsConnectElement.js
            }else{
                //do nothing because nothing happened!
            }
        }
        obj.generateGeometry3d(); // file : same
        updateElementChanges(); // file: nsUpdateProp.js
    });
}

var gethtmlSelectOptFromArrId=function(arr,id){
    // create options to show point objects in the select list
    var selDiv=document.createElement("td");
    var selList = document.createElement("select");
    selList.id = id;
    selDiv.appendChild(selList);
    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.value = arr[i].name+""+arr[i].id;
        option.text = arr[i].name+""+arr[i].id;
        selList.appendChild(option);
    }
    return selDiv;
}

var getAllPoints=function(){
    var pts=[];
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.name.toUpperCase()==="POINT"){
            pts.push(obj);
        }
    }
    return pts;
}

var getAllEdges=function(){
    var edges=[];
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        if(obj.name.toUpperCase()==="LINE"){
            edges.push(obj);
        }
    }
    return edges;
}

function updateElementChanges(){
    for(var i=0; i<SceneElementsArr.length; i++){
        var obj=SceneElementsArr[i];
        obj.generateGeometry3d();
    }   
}