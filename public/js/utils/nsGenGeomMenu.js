var generateGeometryFromMenu=function(){
    for(var i=0; i<SceneElementsArr.length; i++){
        var element=SceneElementsArr[i];
        element.generateGeometry();
    }
}
