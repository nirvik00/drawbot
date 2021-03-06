
var init=function(){
    scene=new THREE.Scene();
    scene.background=new THREE.Color("rgb(255,255,255)");

    camera=new THREE.PerspectiveCamera(45, 1.0, 0.1, 1000);
    camera.up=new THREE.Vector3(0,0,1);    
    camera.position.x=0;
    camera.position.y=20;
    camera.position.z=20;
    
    renderer=new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500,500);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    
    scene3d.appendChild(renderer.domElement);

    axes=new THREE.AxesHelper(1);
    scene.add(axes);
    var gridXY=new THREE.GridHelper(10);
    gridXY.rotation.x=Math.PI/2;
    gridXY.position.set(0,0,0);
    scene.add(gridXY);

    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom=true;
    controls.enablePan=false;
}

var mainLoop=function(){
    requestAnimationFrame(mainLoop);
    render();
}

var render=function(){
    renderer.render(scene,camera);
}

function onWindowResize() {
    camera.aspect = 0.75;
    camera.updateProjectionMatrix();
    renderer.setSize(500,500);
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
}


init();
mainLoop();