var init=function(){
    scene=new THREE.Scene();
    scene.background=new THREE.Color("rgb(255,255,255)");

    mouse=new THREE.Vector2();
    raycaster=new THREE.Raycaster();
    var geoPlane=new THREE.PlaneBufferGeometry(100,100,20);
    var geoMaterial=new THREE.MeshBasicMaterial({ color:new THREE.Color("rgba(0,255,0)"), opacity:025, transparent:true, visible:true });
    plane=new THREE.Mesh(geoPlane, geoMaterial);
    //plane.rotateX(-Math.PI/2);
    scene.add(plane);

    camera=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.up=new THREE.Vector3(0,0,1);    
    camera.position.x=0;
    camera.position.y=20;
    camera.position.z=20;
    
    renderer=new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    scene3d.appendChild(renderer.domElement);
    axes=new THREE.AxesHelper(5);
    scene.add(axes);

    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom=true;

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    console.log(SceneElementsArr.length);
}

var mainLoop=function(){
    requestAnimationFrame(mainLoop);
    render();
}

var render=function(){
    renderer.render(scene,camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event){}

function onDocumentMouseDown(event){
    event.preventDefault();
    mouse.set((event.clientX/window.innerWidth)*2-1, -(event.clientY/window.innerHeight)*2+1);
    raycaster.setFromCamera(mouse,camera);
    var meshObj=[];
    for(var i=0; i<SceneElementsArr.length; i++){
        meshObj.push(SceneElementsArr[i].mesh);
    }
    console.log(SceneElementsArr.length);
    var intersects=raycaster.intersectObjects(meshObj);
    if(intersects.length>0){
        var intersect=intersects[0];
        scene.remove(intersect);
        var x=intersect.x;
        var y=intersect.y;
        var z=intersect.z;
        var p=new THREE.Vector3(x,y,z);
        for(var i=0; i<SceneElementsArr.length; i++){
            var obj=SceneElementsArr[i];
            if(Di(obj.p,p)<0.1){
                meshObj.splice(i,1);
                //obj.mesh.geometry.dispose();
                //obj.mesh.material.dispose();
                scene.remove(obj.mesh);
                obj.genSelectedGeometry();
            }
        }
        console.log(intersect);
    }
    render();
}


init();
mainLoop();